import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Recados } from './entities/recados.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Person } from 'src/persons/entities/person.entity';
import { PersonsService } from 'src/persons/persons.service';

/*
  Service responsável pela regra de negócio
  e acesso aos dados da entidade Recados
*/
@Injectable()
export class RecadosService {
  constructor(
    // Injeta o repositório da entidade Recados (TypeORM)
    @InjectRepository(Recados)
    private readonly recadoRepository: Repository<Recados>,

    // Injeta o service de Persons para reutilizar regras
    // e validações relacionadas à entidade Person
    private readonly personService: PersonsService,
  ) {}

  /*
    Retorna todos os recados cadastrados
    com os relacionamentos "de" e "para"
    carregados parcialmente (id e nome)
  */
  async findAll() {
    const recados = await this.recadoRepository.find({
      relations: ['de', 'para'],
      order: {
        id: 'asc',
      },
      // Define quais campos dos relacionamentos serão retornados
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    return recados;
  }

  /*
    Busca um recado específico pelo id
  */
  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    // Se não encontrar o recado, lança exceção
    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }

    return recado;
  }

  /*
    Cria um novo recado
    associando as pessoas "de" e "para"
  */
  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;

    // Busca as pessoas envolvidas no recado
    const de = await this.personService.findOne(deId);
    const para = await this.personService.findOne(paraId);

    // Monta o objeto do novo recado
    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    // Cria a entidade a partir do objeto
    const recado = this.recadoRepository.create(novoRecado);

    // Persiste o recado no banco de dados
    await this.recadoRepository.save(recado);

    // Retorna o recado formatado (expondo apenas os ids das pessoas)
    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  /*
    Atualiza um recado existente
  */
  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    // Busca o recado pelo id
    const recado = await this.findOne(id);

    // Atualiza apenas os campos enviados
    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;

    // Salva as alterações no banco
    await this.recadoRepository.save(recado);

    return recado;
  }

  /*
    Remove um recado pelo id
  */
  async delete(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    // Se não encontrar o recado, lança exceção
    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }

    // Remove o recado do banco de dados
    await this.recadoRepository.remove(recado);

    return recado;
  }
}
