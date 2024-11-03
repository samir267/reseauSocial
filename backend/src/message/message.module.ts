/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { ChatGateway } from 'src/conversation/chat/chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message,Conversation]),],
  controllers: [MessageController],
  providers: [MessageService,
  ],
})
export class MessageModule {}
