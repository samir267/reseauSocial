import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comments)
    private commentsRepository: Repository<Comments>,
) {}

async create(content: string, userId: number, postId: number) {
    try {
        const comment = this.commentsRepository.create({
            content,
            user: { id: userId },
            post: { id: postId },
        });
        await this.commentsRepository.save(comment);
        return comment;
    } catch (error) {
        throw new Error('Erreur lors de la création du commentaire : ' + error.message);
    }
}

async getCommentsByPostId(postId: number) {
    return await this.commentsRepository.find({
        where: { post: { id: postId } },
        relations: ['user'], // Charger la relation 'user'
        select: {
            user: {
                username: true,  // Sélectionner le nom de l'utilisateur
                profilePhotoUrl: true,  // Sélectionner l'URL de l'image de l'utilisateur
            },
        },
    });
}


    async deleteComment(commentId: number) {
        await this.commentsRepository.delete(commentId);
    }
    
}
