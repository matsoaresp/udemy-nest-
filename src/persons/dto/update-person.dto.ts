import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';


/* 
    DTO usado para validar e transportar dados 
    PartialType converte todos os campos 
*/
export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
