import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class PersonsService {

  constructor(@InjectRepository(Person)
  private readonly personRepository: Repository<Person>) {

  }
  async create(createPersonDto: CreatePersonDto) {
    try {
    const personData = {
      nome: createPersonDto.nome,
      passwordHasg: createPersonDto.password,
      email: createPersonDto.email,
    }
    const novaPessoa = this.personRepository.create(personData)
    await this.personRepository.save(novaPessoa);
    return novaPessoa;
  }catch(error){
    if (error.code === '23505'){
      throw new ConflictException ('E-mail já está cadastrado')
    }
      throw error;
  }
  }

  async findAll() {

    try {

      const persons = await this.personRepository.find({
        order: {
          id: 'asc'
        },
      });

      return persons

    }catch(error){
      if (error.code === '23506'){
         throw new ConflictException ('Erro ao localizar todos as persons')
      }
      throw error
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.personRepository.preload({
        id,
        email: updatePersonDto?.email,
        nome: updatePersonDto?.nome,
    }) 

    if (!person || isNaN(id)) {
      throw new NotFoundException('Pessoa não encontrada')
    }

    return this.personRepository.save(person)
  }

  async remove(id: number) {
    const person = await this.personRepository.findOne({
      where: {
        id
      }
    }) 

    if (!person){
      throw new NotFoundException('Pessoa não encontrada')
    }

    return this.personRepository.remove(person)
  }
}
