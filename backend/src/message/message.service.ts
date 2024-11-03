/* eslint-disable prettier/prettier */
// src/message/message.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,

  ) {}

  async addMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const conversation = await this.conversationRepository.findOneBy({ id: createMessageDto.conversationId });
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${createMessageDto.conversationId} not found.`);
    }

    const message = this.messageRepository.create({
      ...createMessageDto,
      conversation,
    });

    const savedMessage = await this.messageRepository.save(message);
    return savedMessage;
  }
  async deleteMessage(messageId: number): Promise<void> {
    const result = await this.messageRepository.delete(messageId);
    if (result.affected === 0) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
  }

  async markAsRead(messageId: number): Promise<Message> {
    const message = await this.messageRepository.findOneBy({ id: messageId });
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
    message.read = true;
    return await this.messageRepository.save(message);
  }

  async deleteMessageForSender(messageId: number, senderId: number): Promise<void> {
    const message = await this.messageRepository.findOneBy({ id: messageId, senderId });
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found or you do not have permission to delete it`);
    }
    message.isDeletedForSender = true;
    await this.messageRepository.save(message);
  }

  async deleteMessageForBoth(messageId: number): Promise<void> {
    const message = await this.messageRepository.findOneBy({ id: messageId });
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
    message.isDeletedForBoth = true;
    await this.messageRepository.save(message);
  }

  async getMessagesByConversation(conversationId: number): Promise<Message[]> {
    return await this.messageRepository.find({
      where: {
        conversation: {
          id: conversationId, // Query based on the Conversation relation
        },
        isDeletedForSender: false, // Exclude messages deleted by the sender
      },
      relations: ['conversation'], // Ensure to load the conversation relation if needed
    });
  }
  
}
