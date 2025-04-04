import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('System vacancy of job')
    .setDescription('API in NestJS')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.register(require('@fastify/static'), {
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });


  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist : true, forbidNonWhitelisted: true }));

  await app.listen(3000, '0.0.0.0');
}

bootstrap();