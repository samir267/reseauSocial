import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*', // Allow all origins
    credentials: true, // If you are using cookies, keep this true
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  // Applying a global ValidationPipe to automatically validate incoming requests
  app.useGlobalPipes(new ValidationPipe({}));
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disables the default Content Security Policy (CSP) settings
      frameguard: { action: 'deny' }, // Configures frameguard to prevent the app from being displayed inside an iframe (to prevent clickjacking attacks)
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Coder Zone API') // Updated title to reflect your project
    .setDescription('API documentation for the Coder Zone application') // Updated description
    .setVersion('1.0') // API version
    .addTag('users') // Add tags relevant to your API
    .addTag('projects') // Assuming you have a projects tag
    .addTag('auth') // Assuming you have an authentication tag
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
