import { IsNotEmpty, IsPositive, IsString, MinLength } from "class-validator";


export class CreateRecadoDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(100)
    texto: string;

    @IsPositive()
    deId: number;

    @IsPositive()
    paraId: number;   
}

