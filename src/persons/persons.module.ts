import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { Person } from './entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
   imports: [TypeOrmModule.forFeature([Person]),]
})
export class PersonsModule {}
