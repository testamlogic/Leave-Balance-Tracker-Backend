import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This enables automatic validation of incoming data based on DTOs.
  app.useGlobalPipes(new ValidationPipe());

  // Use the environment variable for production, fallback to the local frontend URL.
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
