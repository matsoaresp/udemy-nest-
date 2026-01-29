import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  // @Post é usado para criação
  // @Body recebe os dados enviados no corpo da requisição
  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personsService.create(createPersonDto);
  }

  // @Get é usado para retornar dados
  @Get()
  findAll() {
    return this.personsService.findAll();
  }

  // @Get é usado para retornar dados
  // @Param é usado para capturar parâmetros da URL (ex: /persons/:id)
  @Get(':id')
  findOne(@Param('id') id: number) { 
    return this.personsService.findOne(id);
  }

  // @Patch é usado para atualizar dados
  // @Param captura o id da URL
  // @Body recebe os dados enviados no corpo da requisição
  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updatePersonDto: UpdatePersonDto
  ) {
    return this.personsService.update(id, updatePersonDto);
  }

  // Delete é usado para Remover dados
  // @Param captura o id passado na URL
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personsService.remove(id);
  }
}
