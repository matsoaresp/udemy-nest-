import { PartialType } from "@nestjs/mapped-types";
import { CreateRecadoDto } from "./create-recado.dto";
import { IsBoolean, IsOptional } from 'class-validator';

/* 
    DTO usado para validar e transportar dados 
    PartialType converte todos os campos 
*/
export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {

     /*
        NOTAÇÕES E VARIAVEIS
    */

    @IsBoolean()
    @IsOptional()
    lido?: boolean;
}