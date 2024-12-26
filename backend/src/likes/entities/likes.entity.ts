import { Post } from "src/posts/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('likes')
export class Likes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.likes)
    user: User

    @ManyToOne(() => Post, (post) => post.likes)
    post: Post

    @Column()
    userId: number



}