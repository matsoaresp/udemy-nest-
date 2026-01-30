import { NestInterceptor, ExecutionContext, CallHandler, BadRequestException, Injectable } from "@nestjs/common";
import { catchError, map, Observable, of, tap, throwError } from "rxjs";

@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
    
    private readonly cache = new Map();
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        console.log('ErrorHandlingInterceptor executado ANTES')
        const request = context.switchToHttp().getRequest();
        const url = request.url;


        if (this.cache.has(url)){
            console.log('Está no cache,', url)
            return of(this.cache.get(url))
        }
        
        await new Promise(resolve => setTimeout(resolve, 3000))
        return next.handle().pipe(
          map(data => {
            this.cache.set(url, data);
            console.log('Armazenamento em cache', url)
          })
        );
    }
}