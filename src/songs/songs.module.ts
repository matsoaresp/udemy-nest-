import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
    controllers: [SongsController], // Código com persistencia de dados no banco de dados Postgres/ TypeOrm
    providers: [SongsService],
    imports: []
})
export class SongsModule {
}
