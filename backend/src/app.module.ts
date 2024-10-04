import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { dataSourceOptions } from './db/data-source';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
     dataSourceOptions,
    ),
    UserModule,
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
