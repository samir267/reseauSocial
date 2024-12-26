/* eslint-disable prettier/prettier */
import { Controller, Post, Delete, Param, ParseIntPipe, Get, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,getSchemaPath,ApiQuery } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { FollowersService } from './followers.service';
import { Public } from 'src/auth/utils/public-strategy';
import { AuthGuard } from 'src/auth/utils/Guard/auth.guard';

@ApiTags('followers')
@Controller('followers')
export class FollowersController {
  constructor(private readonly followerService: FollowersService) {}

  @Post('follow/:followerId/:followedId')
  @Public()
  @UseGuards(AuthGuard) 
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Follow a user' })
  @ApiResponse({ status: 200, description: 'Followed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async followUser(
    @Param('followedId', ParseIntPipe) followedId: number,
    @Param('followerId', ParseIntPipe) followerId: number
  ) {
    await this.followerService.followUser(followerId, followedId);
    return { message: 'Followed successfully' };
  }

  @Delete('unfollow/:followerId/:followedId')
 @Public()
 @UseGuards(AuthGuard) 
@ApiBearerAuth() 
  @ApiOperation({ summary: 'Unfollow a user' })
  @ApiResponse({ status: 200, description: 'Unfollowed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async unfollowUser(
    @Param('followedId', ParseIntPipe) followedId: number,
    @Param('followerId', ParseIntPipe) followerId: number
  ) {
    await this.followerService.unfollowUser(followerId, followedId);
    return { message: 'Unfollowed successfully' };
  }
  
 
  @Public()
@Get('followers/:id')
@UseGuards(AuthGuard) 
@ApiBearerAuth() 
@ApiOperation({ summary: 'Get the list of all followers for a user' })
@ApiResponse({
  status: 200,
  description: 'List of followers retrieved successfully',
  schema: {
    properties: {
      data: {
        type: 'array',
        items: { $ref: getSchemaPath(User) }, // Refers to User model schema
      },
      total: { type: 'number', example: 100 },
    },
  },
})
@ApiResponse({ status: 404, description: 'User not found' })
async getFollowers(
  @Param('id', ParseIntPipe) userId: number,
): Promise<{ data: User[]; total: number }> {
  const followers = await this.followerService.getFollowers(userId);
  return { data: followers, total: followers.length };
}

@Public()
@Get('following/:id')
@UseGuards(AuthGuard) 
@ApiBearerAuth() 
@ApiOperation({ summary: 'Get the list of all users followed by a user' })
@ApiResponse({
  status: 200,
  description: 'List of followed users retrieved successfully',
  schema: {
    properties: {
      data: {
        type: 'array',
        items: { $ref: getSchemaPath(User) }, // Refers to User model schema
      },
      total: { type: 'number', example: 100 },
    },
  },
})
@ApiResponse({ status: 404, description: 'User not found' })
async getFollowing(
  @Param('id', ParseIntPipe) userId: number,
): Promise<{ data: User[]; total: number }> {
  const following = await this.followerService.getFollowing(userId);
  return { data: following, total: following.length };
}

  

  
}
