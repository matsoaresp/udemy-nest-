import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { TimmingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';

@UseInterceptors(TimmingConnectionInterceptor, ErrorHandlingInterceptor)
@Controller('recados') //Código com persistencia de dados local
export class RecadosController {

    constructor(private readonly recadosService: RecadosService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll (){
        const recado = this.recadosService.findAll();
        return recado
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne (@Param('id') id: number) {
        return this.recadosService.findOne(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createRecadoDto: CreateRecadoDto) {
        return this.recadosService.create(createRecadoDto);
    }

    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto)
    {

       return this.recadosService.update(id,updateRecadoDto)
    }
    
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    remove (@Param('id') id: number) {
        return this.recadosService.delete(id);
    }
}
