import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { Person } from './entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recados } from 'src/recados/entities/recados.entity';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
   imports: [TypeOrmModule.forFeature([Person]),],
   exports: [PersonsService]
})
export class PersonsModule {}
