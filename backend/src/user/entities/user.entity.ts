/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './userRole';
import { Follower } from 'src/followers/entities/follower.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Likes } from 'src/likes/entities/likes.entity';
import { Comments } from 'src/comments/entities/comments.entity';
import { skills } from 'src/skills/entities/skill.entity';
import { UserSkill } from 'src/user-skills/entities/user-skill.entity';

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

  @Column({ type: 'boolean', default: false })
  isDeactivated: boolean;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ nullable: true })
  verificationCodeExpires: Date;

  @Column({ nullable: true })
  passwordResetTokenExpires: Date;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  facebookId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Follower, (follower) => follower.follower)
  following: Follower[];

  @OneToMany(() => Follower, (follower) => follower.followed)
  followers: Follower[];

  // Définition de la relation OneToMany avec l'entité Post
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];  

  @OneToMany(() => Likes, (like) =>like.user  )
  likes: Likes[];

  @OneToMany(() => Comments, (comments) =>comments.user  )
  comments: Comments[];
  
  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  userSkills: UserSkill[];
}
