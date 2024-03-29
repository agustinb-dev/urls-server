import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://ursl.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  const config = new DocumentBuilder()
    .setTitle('url shortener server')
    .setDescription('url shortener API')
    .setVersion('1.0')
    .addTag('url shortener')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // app.enableCors();
  await app.listen(
    process.env.URLS_SERVER_PORT as string,
    process.env.URLS_SERVER_HOST as string,
  );
}
bootstrap().then(() => {
  console.log(`Server started on port ${process.env.URLS_SERVER_PORT}`);
});
