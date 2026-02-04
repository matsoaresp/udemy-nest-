import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, UploadedFile } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { TokenPayloadParam } from 'src/auth/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { buffer } from 'stream/consumers';

@UseInterceptors(ClassSerializerInterceptor)
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
  @UseGuards(AuthTokenGuard)
  @Get()
  findAll() {
    return this.personsService.findAll();
  }

  // @Get é usado para retornar dados
  // @Param é usado para capturar parâmetros da URL (ex: /persons/:id)
  @UseGuards(AuthTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: number) { 
    return this.personsService.findOne(id);
  }

  // @Patch é usado para atualizar dados
  // @Param captura o id da URL
  // @Body recebe os dados enviados no corpo da requisição
  @UseGuards(AuthTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: number, 
    @Body() updatePersonDto: UpdatePersonDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.personsService.update(id, updatePersonDto,tokenPayload);
  }

  // Delete é usado para Remover dados
  // @Param captura o id passado na URL
  @UseGuards(AuthTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: number,
  @TokenPayloadParam() tokenPayload: TokenPayloadDto){
    return this.personsService.remove(id);
  }


  @UseGuards(AuthTokenGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/upload-picture')
  uploadPicture(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto){

    return {
      fieldname: file.fieldname,
      orifinalname: file.originalname,
      mimetype: file.mimetype,
      buffer: {},
      size: file.size,
    };
  }

}
