import { Injectable, NotFoundException } from '@nestjs/common';
import { Songs } from './entities/songs.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRecadoDto } from 'src/recados/dto/update-recado.dto';

@Injectable()
export class SongsService {

    constructor(
        @InjectRepository(Songs)
        private readonly songRepository: Repository<Songs>
    ) { }


    private lastId: 1;
    private readonly songs: Songs[] = [

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


    async findAll() {
        const songs = await this.songRepository.find()
        return songs
    }

    async findOne(id: string) {

        const song = await this.songRepository.findOne({
            where: { id: Number(id) },
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
        const song = await this.songRepository.create(newSong)
        if(!song)
            this.throwNotFoundError();
        return this.songRepository.save(newSong)

    }

    async update(id: string, updateSongDto: UpdateSongDto) {
        
        const song = await this.songRepository.preload({
            id: Number(id),
            ...updateSongDto,
        });

        if(!song) {
            return this.throwNotFoundError();
        }

        return this.songRepository.save(song);
    }


    async remove(id: string) {

        const song = await this.songRepository.findOne({
            where: { id: Number(id) }
        });

        if(!song) {
            return this.throwNotFoundError();
        }
        return this.songRepository.remove(song)
    }
}
