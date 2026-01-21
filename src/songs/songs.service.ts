import { Injectable, NotFoundException } from '@nestjs/common';
import { Songs } from './entities/songs.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Injectable()
export class SongsService {

    private lastId: 1;
    private readonly songs: Songs [] = [
        
        {
        id: 1,
        nome: "Telephone",
        artista: "Lady Gaga",
        album: "Sei la",
        data: new Date(),

        }
    ]

    throwNotFoundError() {
        throw new NotFoundException('Musicas não encontradas')
    }


    findAll(){
       const musicas = this.songs;
       if (!musicas)
            this.throwNotFoundError();
       
       return musicas
    }

    async findOne (id: string){

        const song = this.songs.find(item => item.id === +id)

        if (song) 
            this.throwNotFoundError()
        return song
    }

    create (createSongsDto: CreateSongDto) {
        this.lastId++
        const id = this.lastId;
        const newSong = {
            id,   
            ...createSongsDto,
            data: new Date()
        }   
        const song = this.songs.push(newSong)  
        if (!song) 
            this.throwNotFoundError();
        return song

    }

    update(id:string, updateSongDto: UpdateSongDto){

        const songsExistenteIndex = this.songs.findIndex(
            item => item.id == +id,
        );

        if (songsExistenteIndex < 0){
            this.throwNotFoundError();
        }

        const songExistente = this.songs[songsExistenteIndex];
        this.songs[songsExistenteIndex] = {
            ...songExistente,
            ...updateSongDto,
        }
        return this.songs[songsExistenteIndex]
    }
}
