import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/index';

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
