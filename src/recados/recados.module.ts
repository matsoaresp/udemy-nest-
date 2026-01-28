import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recados } from './entities/recados.entity';
import { Person } from 'src/persons/entities/person.entity';

@Module({ //Código com persistencia de dados local
  controllers: [RecadosController], 
  providers: [RecadosService],
  imports: [TypeOrmModule.forFeature([Recados, Person]),]
})
export class RecadosModule {
    
}
