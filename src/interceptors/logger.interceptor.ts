import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const className = context.getClass().name;
    const funcName = context.getHandler().name;

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `Response for ${funcName} in ${className}: ${Date.now() - start}ms`,
          ),
        ),
      );
  }
}
