import { Injectable } from '@nestjs/common';
import { Recados } from './entities/recados.entity';
import { last } from 'rxjs';

@Injectable()
export class RecadosService {
    private lastd = 1;
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

    findAll() {
        return this.recados;
    }

    findOne (id: string) {
        return this.recados.find(item => item.id === +id);
    }

    create (body: any) {
        this.lastd++;
        const id = this.lastd;
        const newRecado = {
            id,
            ...body,
        };
        this.recados.push(newRecado);
        return newRecado
    }


}

