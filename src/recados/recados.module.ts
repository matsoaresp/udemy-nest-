import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';

@Module({ //Código com persistencia de dados local
  controllers: [RecadosController], 
  providers: [RecadosService],
  imports: []
})
export class RecadosModule {
    
}
