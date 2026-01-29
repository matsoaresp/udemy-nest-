import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

/*
  Controller responsável por expor as rotas HTTP
  relacionadas aos recados.
*/
@Controller('recados')
export class RecadosController {

    // Injeta o serviço responsável pela regra de negócio
    constructor(private readonly recadosService: RecadosService) { }

    // Retorna todos os recados cadastrados
    @HttpCode(HttpStatus.OK)
    @Get()
    findAll() {
        return this.recadosService.findAll();
    }

    // Retorna um recado específico pelo id
    // @Param captura o id da URL
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.recadosService.findOne(id);
    }

    // Cria um novo recado 
    // @Body recebe os dados enviados no corpo da requisição
    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createRecadoDto: CreateRecadoDto) {
        return this.recadosService.create(createRecadoDto);
    }

    // Atualiza um recado existente pelo id
    // @Param captura o id da URL
    // @Body recebe os dados enviados no corpo da requisição
    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    update(
        @Param('id') id: number,
        @Body() updateRecadoDto: UpdateRecadoDto,
    ) {
        return this.recadosService.update(id, updateRecadoDto);
    }

    // @Param captura o id da URL
    // Remove um recado pelo id
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.recadosService.delete(id);
    }
}
