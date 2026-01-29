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
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimmingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';

/*
  Controller responsável por expor as rotas HTTP
  relacionadas aos recados.
*/
@Controller('recados')
@UseInterceptors(AddHeaderInterceptor, TimmingConnectionInterceptor)
export class RecadosController {
    
  // ✔ Apenas injeta o Service
  constructor(private readonly recadosService: RecadosService) {}

  // Retorna todos os recados com paginação
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.recadosService.findAll(paginationDto);
  }

  // Retorna um recado pelo id
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  // Cria um novo recado
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  // Atualiza um recado existente
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  // Remove um recado
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.delete(id);
  }
}
