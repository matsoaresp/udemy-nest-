import { Module } from '@nestjs/common';
import { ConceptsAutomaticService } from './concepts-automatic.service';
import { ConceptsAutomaticController } from './concepts-automatic.controller';

@Module({
  providers: [ConceptsAutomaticService],
  controllers: [ConceptsAutomaticController]
})
export class ConceptsAutomaticModule {}
