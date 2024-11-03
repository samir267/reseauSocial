/* eslint-disable prettier/prettier */
// src/conversation/entities/conversation.entity.ts
import { Message } from 'src/message/entities/message.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user1Id: number;

  @Column()
  user2Id: number;

  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[]; 
}
