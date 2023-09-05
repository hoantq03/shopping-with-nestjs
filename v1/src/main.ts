import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/index';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
    cors: true,
  });
  const PORT = process.env.PORT;

  // * Add validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      always: false,
      whitelist: true,
    }),
  );
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
  });
}
bootstrap();
