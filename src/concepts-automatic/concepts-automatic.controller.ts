import { Controller, Get } from '@nestjs/common';
import { ConceptsAutomaticService } from './concepts-automatic.service';

@Controller('concepts-automatic')
export class ConceptsAutomaticController {
    constructor(private readonly conceptsAutomaticService: ConceptsAutomaticService){}

    @Get()  
    retornarString ():string {
        return this.conceptsAutomaticService.getHome()
    }
}
