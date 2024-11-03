/* eslint-disable prettier/prettier */
// src/conversation/conversation.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from './entities/conversation.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Public } from 'src/auth/utils/public-strategy';

@ApiTags('conversations') // Grouping the endpoints under 'conversations'
@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
@Public()
  @Post()
  @ApiOperation({ summary: 'Create a new conversation' })
  @ApiResponse({ status: 201, description: 'The conversation has been created.', type: Conversation })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createConversationDto: CreateConversationDto): Promise<Conversation> {
    return this.conversationService.createConversation(createConversationDto.user1Id, createConversationDto.user2Id);
  }
  @Public()

  @Get(':user1Id/:user2Id')
  @ApiOperation({ summary: 'Get conversation by user IDs' })
  @ApiParam({ name: 'user1Id', type: Number, description: 'ID of the first user' })
  @ApiParam({ name: 'user2Id', type: Number, description: 'ID of the second user' })
  @ApiResponse({ status: 200, description: 'Conversation found.', type: Conversation })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  getConversation(
    @Param('user1Id') user1Id: number,
    @Param('user2Id') user2Id: number
  ): Promise<Conversation> {
    return this.conversationService.getConversationById(user1Id, user2Id);
  }
  @Public()

  @Get(':userId/all')
  @ApiOperation({ summary: 'Get all conversations for a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'List of conversations for the user', type: [Conversation] })
  getAllForUser(@Param('userId') userId: number): Promise<Conversation[]> {
    return this.conversationService.getAllConversationsForUser(userId);
  }
  @Public()

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a conversation by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the conversation to delete' })
  @ApiResponse({ status: 204, description: 'Conversation deleted successfully' })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  delete(@Param('id') id: number): Promise<void> {
    return this.conversationService.deleteConversation(id);
  }
}
