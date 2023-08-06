import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ConfigModule.forRoot();
  app.enableCors({
    origin: process.env.URL_FRONT,
  });

  await app.listen(3001);
}

bootstrap();
