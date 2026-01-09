import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateRecadoDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    texto: string;

    @IsString()
    @IsNotEmpty()
    de: string;

    @IsString()
    @IsNotEmpty()
    para:string;
}

