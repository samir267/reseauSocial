import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages, { nullable: false }) // Make conversation required
  conversation: Conversation;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false }) // Track read status
  read: boolean;

  @Column({ default: false })
  isDeletedForSender: boolean;

  @Column({ default: false })
  isDeletedForBoth: boolean;
}
