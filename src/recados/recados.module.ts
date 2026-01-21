import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { SongsController } from 'src/songs/songs.controller';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  controllers: [RecadosController],
  providers: [RecadosService],
  imports: [SongsModule]
})
export class RecadosModule {
    
}
