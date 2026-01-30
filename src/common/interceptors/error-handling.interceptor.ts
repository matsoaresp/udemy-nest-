import { NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";

export class ErrorHandlingInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        console.log('ErrorHandlingInterceptor executado ANTES')

        
        return next.handle().pipe(
           catchError((error) => {
                console.log('Deu ERRO')
                return throwError(() => {
                    if (error.name === 'NotFoundException'){
                        return new BadRequestException(error.message)
                    }
                }
                );
           })
        );
    }
}