/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { FollowersModule } from './followers/followers.module';
import { ChatGateway } from './conversation/chat/chat.gateway';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(
     dataSourceOptions,
    ),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),   
     AuthModule,
    EmailModule,
    FollowersModule,
    ConversationModule,
    MessageModule,
    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
