import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { UserRole } from './userRole';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true, length: 50 })
    username: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
    @Column({ nullable: true })
    refreshToken: string; 
 
  
  
  
    @Column({ nullable: true })
    profilePhotoUrl: string;
  
    @Column({ nullable: true })
    location: string;
    @Column({ type: 'enum', enum: UserRole, nullable: true })
    role: UserRole; 
  
    @Column({ nullable: true })
    occupation: string;
  
    @Column({ type: 'int', default: 0 })
    viewedProfile: number;
  
    @Column({ type: 'int', default: 0 })
    impressions: number;
  
    @Column({ type: 'boolean', default: false })
    isVerified: boolean;
  
    @Column({ nullable: true })
    verificationCode: string;
  
    @Column({ nullable: true })
    verificationCodeExpires: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
   
    
  }
  