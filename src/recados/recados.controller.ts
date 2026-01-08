import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {

    constructor(private readonly recadosService: RecadosService) {

    }

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll (@Query() pagination: any){
        return this.recadosService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOne (@Param('id') id: string) {
        return this.recadosService.findOne(id);
    }

    
    @Post()
    create(@Body() body: any) {
        return this.recadosService.create(body);
    }

    @Patch(':id')
    update(@Param(':id') id: string, @Body() body: any) {
        return {
            id,
                ...body
        }
    }
    
    @Delete(':id')
    remove (@Param(':id') id:string) {
        return id;
    }
}
