import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as process from 'node:process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || '31000';

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: 'post.v1',
      protoPath: join(__dirname, 'proto/post.proto'),
      url: '0.0.0.0:50051'
    }
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('GRPC Microservice')
    .setDescription('GRPC Microservice Dashboard documentation')
    .setVersion('1.0')
    // .addBearerAuth({
    //   type: 'http',
    //   scheme: 'Bearer',
    // })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(PORT, () => {
    console.log(`Swagger docs: http://localhost:${PORT}/api/docs`);
    console.log(`Listen port ${PORT}`);
  });
}
bootstrap();
