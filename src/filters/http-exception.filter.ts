import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// interface ExceptionResponse {
//   statusCode: HttpStatus;
//   message: string;
//   error: string | null;
// }

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response
      .status(
        exception instanceof HttpException
          ? status
          : HttpStatus.INTERNAL_SERVER_ERROR,
      )
      .json(exceptionResponse);
  }
}
