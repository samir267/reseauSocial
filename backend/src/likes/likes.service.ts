import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
    constructor( @InjectRepository(Likes)
    private likesRepository: Repository<Likes>,) {}
    
    async addLike(userId: number, postId: number): Promise<Likes> {
      const like = this.likesRepository.create({post: {id: postId}, user: {id: userId}});
      return await this.likesRepository.save(like);
    }

    async removeLike(userId: number, postId: number): Promise<void> {
      await this.likesRepository.delete({post: {id: postId}, user: {id: userId}});
    }


async getLikesByPostId(postId: number): Promise<Likes[]> {
      return await this.likesRepository.find({ where: { post: { id: postId } } });
    }

}


    