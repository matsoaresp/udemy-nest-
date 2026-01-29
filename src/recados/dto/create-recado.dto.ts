import { IsNotEmpty, IsPositive, IsString, MinLength } from "class-validator";

// DTO para validação de transporte de dados
export class CreateRecadoDto { 
    

     /*
        NOTAÇÕES E VARIAVEIS
    */
    @IsString()
    @IsNotEmpty()
    @MinLength(100)
    texto: string;

    @IsPositive()
    deId: number;

    @IsPositive()
    paraId: number;   
}

