import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import * as passport from 'passport';
import * as session from 'express-session';
const MongoDBStore = require('connect-mongodb-session')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ConfigModule.forRoot();
  app.enableCors({
    origin: '*',
  });

  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      store: MongoDBStore({
        // Configuración para la conexión a la base de datos MongoDB
        collection: 'sessions',
        uri: process.env.MONGO_URI,
      }),
    }),
  );

  app.use(passport.initialize());

  await app.listen(3001);
}

bootstrap();
