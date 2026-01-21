import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateRecadoDto } from 'src/recados/dto/update-recado.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {

    constructor(private readonly songsService: SongsService){
        
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll () {
        const songs = this.songsService.findAll()
        return songs;
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    findOne (@Param ('id') id:string) {
        return this.songsService.findOne(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() createSongsDto: CreateSongDto){
        return this.songsService.create(createSongsDto);
    }

    @HttpCode(HttpStatus.OK)
    @Patch(':id')
    updateSong(@Param('id', ParseIntPipe) id:string, 
                @Body() updateSongDto: UpdateSongDto) {
            
            return this.songsService.update(id, updateSongDto)
    }

    
}
