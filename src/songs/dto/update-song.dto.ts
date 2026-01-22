import { PartialType } from "@nestjs/mapped-types";
import { CreateRecadoDto } from "src/recados/dto/create-recado.dto";
import { CreateSongDto } from "./create-song.dto";

export class UpdateSongDto extends PartialType(CreateSongDto){
    
}