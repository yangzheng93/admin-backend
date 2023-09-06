import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://127.0.0.1:9999', 'http://localhost:9999'],
      methods: 'POST, GET, DELETE, PUT, PATCH, OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, stopAtFirstError: true }),
  );
  app.setGlobalPrefix('mes-v1');
  await app.listen(3000);
}

bootstrap();
