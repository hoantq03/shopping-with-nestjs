import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  // * Add validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      always: false,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
  });
}
bootstrap();
