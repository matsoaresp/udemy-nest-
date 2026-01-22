import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [ 
    RecadosModule,
    SongsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      database: 'postgres',
      password: '123456',
      autoLoadEntities: true, // Carrega entidades sem precisar especifica-las
      synchronize: true // Sincroniza com o BD. Não deve ser usado em produção
    })
  ],

    
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
