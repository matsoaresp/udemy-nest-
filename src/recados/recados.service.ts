import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Recados } from './entities/recados.entity';
import { last } from 'rxjs';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/persons/entities/person.entity';

@Injectable() //Código com persistencia de dados local (com array)
export class RecadosService {

    constructor(
        @InjectRepository(Recados)
        private readonly recadoRepository: Repository<Recados>,
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>
    ) {



    }
    throwNotFoundError() {
        throw new NotFoundException('Recado não encontrado')
    }


    async findAll() {

        try {

            const recados = await this.recadoRepository.find({
                order: {
                    id: 'asc'
                }
            });
            return recados
        } catch(error) {
            if(error.code === '23505') {
                throw new ConflictException('Erro ao localizar todos os recados');
            }
        }

    }

    async findOne(id: number) {


        const recado = await this.recadoRepository.findOne({
            where: {
                id,
            }
        });

        if(!recado) {
            throw new NotFoundException('Recado não encontrado');
        }
        return recado;
    }

    async create(createRecadoDto: CreateRecadoDto) {
        try {
            const pessoaDe = await this.personRepository.findOne({
                where: { id: Number(createRecadoDto.de) },
            });

            const pessoaPara = await this.personRepository.findOne({
                where: { id: Number(createRecadoDto.para) },
            });

            if(!pessoaDe || !pessoaPara) {
                throw new NotFoundException('Pessoa não encontrada');
            }

            const novoRecado = this.recadoRepository.create({
                texto: createRecadoDto.texto,
                de: pessoaDe,
                para: pessoaPara,
                data: new Date(),
            });

            await this.recadoRepository.save(novoRecado);
            return novoRecado;

        } catch(error) {
            if(error.code === '23505') {
                throw new ConflictException('Erro ao cadastrar');
            }
            throw error;
        }
    }


    async update(id: number, updateRecadoDto: UpdateRecadoDto) {
        const pessoaDe = updateRecadoDto.de
            ? await this.personRepository.findOne({
                where: { id: Number(updateRecadoDto.de) },
            })
            : undefined;

        const pessoaPara = updateRecadoDto.para
            ? await this.personRepository.findOne({
                where: { id: Number(updateRecadoDto.para) },
            })
            : undefined;

        if(updateRecadoDto.de && !pessoaDe) {
            throw new NotFoundException('Pessoa "de" não encontrada');
        }

        if(updateRecadoDto.para && !pessoaPara) {
            throw new NotFoundException('Pessoa "para" não encontrada');
        }

        const recado = await this.recadoRepository.preload({
            id,
            texto: updateRecadoDto.texto,
            de: pessoaDe ?? undefined,
            para: pessoaPara ?? undefined,
        });


        if(!recado) {
            throw new NotFoundException('Recado não encontrado');
        }

        return this.recadoRepository.save(recado);
    }



    async delete(id: number) {
        const recado = await this.recadoRepository.findOne({
            where: { id },
        });

        if(!recado) {
            throw new NotFoundException('Recado não encontrado');
        }

        await this.recadoRepository.remove(recado);
        return recado;
    }
}

