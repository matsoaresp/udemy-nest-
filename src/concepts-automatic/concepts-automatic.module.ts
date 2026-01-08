import { Module } from '@nestjs/common';
import { ConceptsAutomaticService } from './concepts-automatic.service';

@Module({
  providers: [ConceptsAutomaticService]
})
export class ConceptsAutomaticModule {}
