import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { Likes } from './entities/likes.entity';
import { Public } from 'src/auth/utils/public-strategy';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('add/:userId/:postId')
  async addLike(@Param('userId') userId: number, @Param('postId') postId: number): Promise<Likes> {
    return await this.likesService.addLike(userId, postId);
  }

  @Delete('remove/:userId/:postId')
  async removeLike(@Param('userId') userId: number, @Param('postId') postId: number): Promise<void> {
    await this.likesService.removeLike(userId, postId);
  }

  @Get('get/:postId')
  async getLikesByPostId(@Param('postId') postId: number): Promise<Likes[]> { 
    return await this.likesService.getLikesByPostId(postId);
  }
}
