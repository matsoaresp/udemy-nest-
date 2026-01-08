import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsManualModule } from 'src/concepts-manual/concepts-manual.module';
import { ConceptsAutomaticModule } from 'src/concepts-automatic/concepts-automatic.module';
import { RecadosModule } from 'src/recados/recados.module';

@Module({
  imports: [ConceptsManualModule,ConceptsAutomaticModule, RecadosModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
