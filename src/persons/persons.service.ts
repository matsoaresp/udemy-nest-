import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { HashingServiceProtocol } from 'src/auth/hashing/hashing.service';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';

@Injectable()  // Marca a classe como provider para injeção de dependência
export class PersonsService {

  constructor(@InjectRepository(Person) // Injeta o repositório do TypeORM para operações no banco
  private readonly personRepository: Repository<Person>,
  private readonly hashingServiceProtocol: HashingServiceProtocol)
  {}
  async create(createPersonDto: CreatePersonDto) {
    try {
    const passwordHash = await this.hashingServiceProtocol.hash(
      createPersonDto.password,
    );
      
    const personData = { // Mapeia os dados do DTO para criação da entidade
      nome: createPersonDto.nome,
      passwordHash: passwordHash,
      email: createPersonDto.email,
    }
    const novaPessoa = this.personRepository.create(personData) // Cria a instância da entidade (não persiste) 
    await this.personRepository.save(novaPessoa); // Persiste a entidade no banco de dados
  }catch(error){ // Trata exceções durante a criação da pessoa 
    if (error.code === '23505'){ // Violação de constraint UNIQUE (email duplicado)
      throw new ConflictException ('E-mail já está cadastrado')
    }
      throw error;
  }
  }

  async findAll() {

    try {

      // Busca todas as pessoas ordenadas por id
      const persons = await this.personRepository.find({ 
        order: {
          id: 'asc'
        },
      });

      return persons // Retorna a lista de pessoas encontradas

    }catch(error){ 

      // Trata exceções durante a consulta ao banco de dados
      if (error.code === '23506'){
         throw new ConflictException ('Erro ao localizar todos as persons')
      }
      throw error
    }
  }

  async findOne(id: number): Promise<Person> {

  const person = await this.personRepository.findOne({ //Busca a pessoa pelo ID
    where: { id },
  });

  if (!person) { // Se não encontrar lança uma exceção
    throw new NotFoundException('Person não encontrada');
  }
 
  return person; // Retorna os dados da pessoa encontrada
}


  async update(id: number, 
    updatePersonDto: UpdatePersonDto,
    tokenPayload: TokenPayloadDto,
  ) {
    // Carrega a pessoa existente e aplica os dados de atualização

      const dadosPessoa = {
        nome: updatePersonDto?.nome,
      };

     if(updatePersonDto?.password) {
      const passwordHash = await this.hashingServiceProtocol.hash(
        updatePersonDto.password
      );

      dadosPessoa['passwordHash'] = passwordHash;
    }

    const person = await this.personRepository.preload({ 
        id,
        email: updatePersonDto?.email,
        nome: updatePersonDto?.nome,
    }) 
 

    if (!person) { // Se não encontrar lança uma exceção e encerra a execução
      throw new NotFoundException('Pessoa não encontrada')
    }

    if (person.id !== tokenPayload.sub){
        throw new ForbiddenException('Voce não é essa pessoa')
    }
    
    return this.personRepository.save(person) // Salva as alterações no banco de dados
  }

  async remove(id: number) {
    const person = await this.personRepository.findOne({ // Busca a pessoa pelo id no banco de dados
      where: {
        id
      }
    }) 

    if (!person){
      throw new NotFoundException('Pessoa não encontrada')
    }

    return this.personRepository.remove(person) // Remove a pessoa do banco de dados
  }
}
