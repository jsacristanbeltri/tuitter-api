import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: AppModule.secret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 6000000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  })).useStaticAssets(path.join(__dirname, '../uploads'));


  await app.listen(AppModule.port);
}
bootstrap();
