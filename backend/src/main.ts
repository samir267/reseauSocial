import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
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
