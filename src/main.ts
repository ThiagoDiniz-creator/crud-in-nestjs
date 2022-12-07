import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // O ValidationPipe global realiza diversas operações automaticamente, como verificar se os dados
  // recebidos estão coerentes com o DTO. Você pode definir propriedades como @IsNumber, no DTO da classe
  // e permitir que o ValidationPipe verifique para você.
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/v1');

  // Middlewares podem ser aplicados globamente com o app.use(), assim como ocorre no ExpressJS.
  //app.use(middleware);
  await app.listen(3000);
}

bootstrap();
