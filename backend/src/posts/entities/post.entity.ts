// src/posts/entities/post.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Likes } from 'src/likes/entities/likes.entity';
import { Comments } from 'src/comments/entities/comments.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Likes, (like) => like.post)
  likes: Likes[];

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];

  @CreateDateColumn()
  createdAt: Date;
}
