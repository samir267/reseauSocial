import { Post } from "src/posts/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Comments {
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.comments)
    user: User

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post
    

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

}
