import { Controller, Get, Post as PostRequest,UploadedFile, Body, Param, Delete, Put, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import { Post } from 'src/posts/entities/post.entity';
import { ApiOperation, ApiResponse, ApiParam, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/auth/utils/public-strategy';
import { Post as PostEntity } from 'src/posts/entities/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { text } from 'stream/consumers';

@Public()
@ApiTags('posts')
@ApiConsumes('multipart/form-data') // Swagger indiquera que c'est une requête 'multipart/form-data'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // CREATE
  @PostRequest('upload')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'The post has been successfully created.',
    type: Post, 
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        text: { type: 'string' },    // Propriétés de CreatePostDto
        userId: { type: 'number' },    // Propriétés de CreatePostDto
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPostDto: CreatePostDto,         // Données du corps
    @UploadedFile() image: Express.Multer.File    // Fichier image
  ): Promise<Post> {
    // console.log('CreatePostDto:', createPostDto);
    console.log('Image received:', image);
    return this.postsService.create(createPostDto, image); // Remplacez par la logique pour créer un post
  }
  

  // READ - Get all posts
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of all posts.',
    type: [Post],
  })
  async findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  // READ - Get a post by ID
  @Get(':id')
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the post to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully retrieved.',
    type: Post,
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  async findOne(@Param('id') id: number): Promise<Post> {
    return this.postsService.findOne(id);
  }

  // READ - Get posts by user ID
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get posts by user ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'The ID of the user to get posts for' })
  @ApiResponse({
    status: 200,
    description: 'List of posts for the given user.',
    type: [Post],
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async getPostsByUserId(@Param('userId') userId: number): Promise<Post[]> {
    return this.postsService.getPostsByUserId(userId);
  }

  // UPDATE
  @Put(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the post to update' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully updated.',
    type: Post,
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    return this.postsService.update(id, updatePostDto);
  }

  // DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'The ID of the post to delete' })
  @ApiResponse({
    status: 200,
    description: 'The post has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.postsService.remove(id);
  }
}
