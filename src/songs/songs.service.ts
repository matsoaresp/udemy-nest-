import { Injectable, NotFoundException } from '@nestjs/common';
import { Songs } from './entities/songs.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SongsService { // Código com persistencia de dados no banco de dados Postgres/ TypeOrm

    constructor(
        @InjectRepository(Songs)
        private readonly songRepository: Repository<Songs>
    ) {}

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

    throwDuplicateError() {
        throw new NotFoundException('Musicas duplicada, crie outra música')
    }

    throwEmptyValues() {
        throw new NotFoundException('Não é possivel inserir valores vazios')
    }
    


    findAll(){
       const musicas = this.songs;
       if (!musicas)
            this.throwNotFoundError();
       
       return musicas
    }

    async findOne(id: string) { 

       
        const stringToNumber = parseInt(id)

        if (stringToNumber <= 0 || isNaN(stringToNumber)){
            this.throwNotFoundError()
        } 

        const song = await this.songRepository.findOne({
            where: {id: stringToNumber},
        });
        if(!song)
            this.throwNotFoundError()
        return song
    }

    async create(createSongsDto: CreateSongDto) {

         const newSong = {
            ...createSongsDto,
            data: new Date()
        }

        if (newSong.nome === '' || newSong.artista === '') {
            this.throwEmptyValues();
        }

        const existingSong = await this.songRepository.findOne({
            where: {nome: createSongsDto.nome,
                artista: createSongsDto.artista 
            }
        })

        if (existingSong) {
            this.throwDuplicateError();
        }
        const song = await this.songRepository.create(newSong)
       
        return this.songRepository.save(song)

    }

    update(id:string, updateSongDto: UpdateSongDto){

        const songsExistenteIndex = this.songs.findIndex(
            item => item.id === +id,
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
