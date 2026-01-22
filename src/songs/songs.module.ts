import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Songs } from './entities/songs.entity';

@Module({
    controllers: [SongsController], // Código com persistencia de dados no banco de dados Postgres/ TypeOrm
    providers: [SongsService],
    imports: [TypeOrmModule.forFeature([Songs]),]
})
export class SongsModule {
}
