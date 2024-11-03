/* eslint-disable prettier/prettier */
// src/entities/follower.entity.ts
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Unique,
  } from 'typeorm';
  
  @Entity('followers')
  @Unique(['follower', 'followed'])
  export class Follower {
    // eslint-disable-next-line prettier/prettier
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
    follower: User;
  
    @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
    followed: User;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  