import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class TimmingConnectionInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const now = Date.now();

        await new Promise(resolve => setTimeout(resolve, 3000))

        return next.handle().pipe(
            tap(() => {
                const finalTime = Date.now();
                const elapsed = finalTime - now
                console.log(`TimingConnectionInterceptor: ${elapsed} executado DEPOIS`)
                return elapsed
            }),
        );
    }
}