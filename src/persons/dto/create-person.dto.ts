import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

        //DTO usado para validar e transportar dados
export class CreatePersonDto { 

    /*
        NOTAÇÕES E VARIAVEIS
        Notação para receber formatação de e-mail 
    */
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(100)
    nome: string;
}
