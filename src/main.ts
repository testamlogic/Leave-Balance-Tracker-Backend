import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsAllowOrigin = process.env.CORS_ALLOW_ORIGIN || 'http://localhost:3001';
  app.enableCors({
    origin: corsAllowOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  console.log(corsAllowOrigin);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
