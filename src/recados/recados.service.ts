import { Injectable, NotFoundException } from '@nestjs/common';
import { Recados } from './entities/recados.entity';
import { last } from 'rxjs';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
    private lastid = 1;
    private recados: Recados[] = [
        {
        id: 1,
        texto: 'Este é um recado de teste',
        de: 'Joana',
        para: 'Joao',
        lido: false,
        data: new Date(),
        },
    ];

    throwNotFoundError(){
       throw new NotFoundException('Recado não encontrado')
    }
    

    findAll() {
        const recados = this.recados;
        if (!recados){
            this.throwNotFoundError();
        }
        return recados;
    }

    findOne (id: string) {
        const recado = this.recados.find(item => item.id === +id);
        if (!recado) 
            this.throwNotFoundError();

        return recado;
    }

    create (createRecadoDto: CreateRecadoDto) {
        this.lastid++;
        const id = this.lastid;
        const newRecado = {
            id,
            ...createRecadoDto,
            lido:false,
            data: new Date(),
        };
        const criarRecado = this.recados.push(newRecado);
        if (!criarRecado)
            throw new NotFoundException('Erro ao criar recado')
        return newRecado
    }

    update (id: string, updateRecadoDto: UpdateRecadoDto) {
        const recadoExistenteIndex = this.recados.findIndex(
            item => item.id === +id,
        );

        if (recadoExistenteIndex < 0){
            this.throwNotFoundError();
        }
            const recadoExistente = this.recados[recadoExistenteIndex];

             this.recados[recadoExistenteIndex] = {
            ...recadoExistente,
            ...updateRecadoDto,
            lido:false,
            data: new Date(),
        }
        
        return this.recados[recadoExistenteIndex]

    }

    delete(id:number) {
        const recadoExistenteIndex = this.recados.findIndex(
            item => item.id === +id,
        );

        if (recadoExistenteIndex < 0)
            this.throwNotFoundError();
        
        const recado = this.recados[recadoExistenteIndex];
        this.recados.splice(recadoExistenteIndex, 1)
        return recado;
    }
}

