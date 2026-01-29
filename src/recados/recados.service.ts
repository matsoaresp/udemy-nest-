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

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recados)
    private readonly recadoRepository: Repository<Recados>,

   private readonly personService: PersonsService,
  ) {}

  
  async findAll() {
    const recados = await this.recadoRepository.find({
      relations: ['de', 'para' ],
      order: {
        id: 'asc',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome:true,
        }
      }
    });

    return recados
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }

    return recado;
  }

  async create(
    createRecadoDto: CreateRecadoDto,
  ) {
    
    const {deId, paraId} = createRecadoDto;

    const de = await this.personService.findOne((deId))
    const para = await this.personService.findOne((paraId))

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date()
    }
    
    if (!novoRecado) {
      throw new NotFoundException("Não foi possivel criar o recado")
    }
    const recado = await this.recadoRepository.create(novoRecado)
    await this.recadoRepository.save(recado)
    return {
      ...recado,
      de: {
        id: recado.de.id
      },
      para: {
        id: recado.para.id
      }
    }
  }

  async update(
    id: number,
    updateRecadoDto: UpdateRecadoDto,
  ) {

    const {deId, paraId} = updateRecadoDto

    const recado = await this.findOne(id)
    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;
    await this.recadoRepository.save(recado)
    return recado

  }

  async delete(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    if (!recado) {
      throw new NotFoundException('Recado não encontrado');
    }

    await this.recadoRepository.remove(recado);
    return recado;
  }
}
