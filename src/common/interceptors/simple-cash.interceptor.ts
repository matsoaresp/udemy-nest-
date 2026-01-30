import { NestInterceptor, ExecutionContext, CallHandler, BadRequestException, Injectable } from "@nestjs/common";
import { catchError, Observable, of, tap, throwError } from "rxjs";

@Injectable()
export class SimpleCashInterceptor implements NestInterceptor {
    
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
          tap(data => {
            this.cache.set(url, data);
            console.log('Armazenamento em cache', url)
          })
        );
    }
}