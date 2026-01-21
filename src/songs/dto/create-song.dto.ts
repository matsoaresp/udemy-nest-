import { IsNotEmpty, IsString } from "class-validator";

export class CreateSongDto {

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    artista: string;

    @IsString()
    @IsNotEmpty()
    album: string;
}