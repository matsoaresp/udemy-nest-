import { PartialType } from "@nestjs/mapped-types";
import { CreateRecadoDto } from "src/recados/dto/create-recado.dto";

export class UpdateSongDto extends PartialType(CreateRecadoDto){
    
}