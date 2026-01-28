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
    ) { }
    throwNotFoundError() {
        throw new NotFoundException('Musicas não encontradas')
    }
    throwDuplicateError() {
        throw new NotFoundException('Musicas duplicada, crie outra música')
    }
    throwEmptyValues() {
        throw new NotFoundException('Não é possivel inserir valores vazios')
    }
    async findAll() {
        const songs = await this.songRepository.find()
        return songs
    }

    async findOne(id: number) {


        const stringToNumber = Number(id)

        if(stringToNumber <= 0 || isNaN(stringToNumber)) {
            this.throwNotFoundError()
        }

        const song = await this.songRepository.findOne({
            where: { id: stringToNumber },
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

        if(newSong.nome === '' || newSong.artista === '') {
            this.throwEmptyValues();
        }

        const existingSong = await this.songRepository.findOne({
            where: {
                nome: createSongsDto.nome,
                artista: createSongsDto.artista
            }
        })

        if(existingSong) {
            this.throwDuplicateError();
        }
        const song = await this.songRepository.create(newSong)

        return this.songRepository.save(song)

    }

    async update(id: number, updateSongDto: UpdateSongDto) {


       const song = await this.songRepository.preload({
        id,
        ...updateSongDto,
       });

       if(!song || isNaN(id)) return this.throwNotFoundError

       await this.songRepository.save(song)
       return song
    }

    async remove(id: number) {

        const song = await this.songRepository.findOne({
            where: { id: Number(id) }
        });

        if(!song) {
            return this.throwNotFoundError();
        }
        return this.songRepository.remove(song)
    }
}
