import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateRecadoDto {
    
    @IsString()
    @IsNotEmpty()
    texto: string;

    @IsString()
    @IsNotEmpty()
    de: string;

    @IsString()
    @IsNotEmpty()
    para:string;
}

