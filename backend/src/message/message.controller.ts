/* eslint-disable prettier/prettier */
// src/message/message.controller.ts

import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  Get,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Public } from 'src/auth/utils/public-strategy';
@Public()
@ApiTags('messages') // Grouping the endpoints under 'messages'
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new message to a conversation' })
  @ApiResponse({ status: 201, description: 'Message added successfully', type: Message })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  addMessage(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    console.log('Adding message with DTO:', createMessageDto);

    return this.messageService.addMessage(createMessageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the message to delete' })
  @ApiResponse({ status: 204, description: 'Message deleted successfully' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  deleteMessage(@Param('id') id: number): Promise<void> {
    return this.messageService.deleteMessage(id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a message as read' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the message to mark as read' })
  @ApiResponse({ status: 200, description: 'Message marked as read', type: Message })
  @ApiResponse({ status: 404, description: 'Message not found' })
  markAsRead(@Param('id') id: number): Promise<Message> {
    return this.messageService.markAsRead(id);
  }

  @Delete(':id/sender/:senderId')
  @ApiOperation({ summary: 'Delete a message for the sender' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the message to delete' })
  @ApiParam({ name: 'senderId', type: Number, description: 'ID of the sender attempting to delete the message' })
  @ApiResponse({ status: 204, description: 'Message deleted for the sender' })
  @ApiResponse({ status: 404, description: 'Message not found or permission denied' })
  deleteMessageForSender(
    @Param('id') id: number,
    @Param('senderId') senderId: number,
  ): Promise<void> {
    return this.messageService.deleteMessageForSender(id, senderId);
  }

  @Delete(':id/both')
  @ApiOperation({ summary: 'Delete a message for both parties' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the message to delete for both' })
  @ApiResponse({ status: 204, description: 'Message deleted for both parties' })
  @ApiResponse({ status: 404, description: 'Message not found' })
  deleteMessageForBoth(@Param('id') id: number): Promise<void> {
    return this.messageService.deleteMessageForBoth(id);
  }

  @Get('conversation/:conversationId')
  @ApiOperation({ summary: 'Get messages by conversation' })
  @ApiParam({ name: 'conversationId', type: Number, description: 'ID of the conversation' })
  @ApiResponse({ status: 200, description: 'Messages retrieved successfully', type: Message, isArray: true })
  @ApiResponse({ status: 404, description: 'No messages found for the conversation' })
  getMessagesByConversation(@Param('conversationId') conversationId: number): Promise<Message[]> {
    return this.messageService.getMessagesByConversation(conversationId);
  }
}
