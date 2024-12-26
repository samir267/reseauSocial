import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/utils/public-strategy';
import { CreateCommentDto } from './dto/comments.dto';

@Public()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('comments/create')
  async createComment(@Body() createCommentDto: CreateCommentDto) {
      return this.commentsService.create(createCommentDto.content, createCommentDto.userId, createCommentDto.postId);
  }
  

  @Delete('comments/delete/:commentId')
  deleteComment(@Body() commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }

  @Get('comments/get/:postId')
getCommentsByPostId(@Param('postId') postId: number) {
    return this.commentsService.getCommentsByPostId(postId);
}

}


