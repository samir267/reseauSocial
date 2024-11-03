/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';



@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async createConversation(user1Id: number, user2Id: number): Promise<Conversation> {
    // Check if conversation already exists
    const existingConversation = await this.conversationRepository.findOne({
      where: [
        { user1Id, user2Id },
        { user1Id: user2Id, user2Id: user1Id }, // Check both combinations for a conversation
      ],
    });

    if (existingConversation) {
      return existingConversation; // Return existing conversation
    }

    const conversation = this.conversationRepository.create({ user1Id, user2Id });
    return this.conversationRepository.save(conversation);
  }

  async getConversationById(user1Id: number, user2Id: number): Promise<Conversation> {
    const conversation = await this.conversationRepository.findOne({
      where: [
        { user1Id, user2Id },
        { user1Id: user2Id, user2Id: user1Id },
      ],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    return conversation;
  }

  async getAllConversationsForUser(userId: number): Promise<Conversation[]> {
    return this.conversationRepository.find({
      where: [
        { user1Id: userId },
        { user2Id: userId },
      ],
    });
  }

  async deleteConversation(conversationId: number): Promise<void> {
    const result = await this.conversationRepository.delete(conversationId);
    if (result.affected === 0) {
      throw new NotFoundException('Conversation not found');
    }
  }



}
