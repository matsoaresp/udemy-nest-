import { Injectable, NotFoundException } from '@nestjs/common';
import { Songs } from './entities/songs.entity';

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

    create (body: Songs) {
        this.lastId++
        const id = this.lastId;
        const newSong = {
            id,   
            ...body,
        }   
        const song = this.songs.push(newSong)  
        if (!song) 
            this.throwNotFoundError();
        return song

    }

    update(id:string, body: Songs){

        const songsExistenteIndex = this.songs.findIndex(
            item => item.id === +id,
        );

        if (songsExistenteIndex < 0){
            this.throwNotFoundError();
        }

        const recadoExistente = this.songs[songsExistenteIndex];
        this.songs[songsExistenteIndex] = {
            ...recadoExistente,
            ...body,
        }
        return this.songs[songsExistenteIndex]
    }

    remove (id:string){

        const songsExistenteIndex = this.songs.findIndex (
            item => item.id === +id,
        );

        if (songsExistenteIndex < 0) {
            this.throwNotFoundError();
        }

        const song = this.songs[songsExistenteIndex]
        this.songs.splice(songsExistenteIndex, 1)
        return song;
    }
}
