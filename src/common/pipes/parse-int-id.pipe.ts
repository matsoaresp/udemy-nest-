import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntIdPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
            if (metadata.type !== 'param' || metadata.data !== 'id'){
                    return value
            }
            
    const parsedValue = Number(value)
    if (isNaN(parsedValue)){
        throw new BadRequestException('ParsedIntPipe espera uma string numerica')
    }
    }
}