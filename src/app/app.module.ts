import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsManualModule } from 'src/concepts-manual/concepts-manual.module';
import { ConceptsAutomaticModule } from 'src/concepts-automatic/concepts-automatic.module';
import { RecadosModule } from 'src/recados/recados.module';
import { SongsModule } from 'src/songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConceptsManualModule,
    ConceptsAutomaticModule, 
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
