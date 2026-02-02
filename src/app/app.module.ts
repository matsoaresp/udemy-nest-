import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongsModule } from 'src/songs/songs.module';
import { PersonsModule } from 'src/persons/persons.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';

@Module({
  imports: [ 
    RecadosModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load: [jwtConfig],
    }),
    SongsModule,
    PersonsModule,
    AuthModule,
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
