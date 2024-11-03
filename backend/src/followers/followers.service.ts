/* eslint-disable prettier/prettier */
// src/follower/follower.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follower } from './entities/follower.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly FollowersRepository: Repository<Follower>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async followUser(followerId: number, followedId: number): Promise<void> {
    if (followerId === followedId) {
      throw new Error("You cannot follow yourself");
    }

    const follower = await this.userRepository.findOneBy({ id: followerId });
    const followed = await this.userRepository.findOneBy({ id: followedId });

    if (!follower || !followed) {
      throw new Error("User not found");
    }

    const follow = this.FollowersRepository.create({ follower, followed });
    await this.FollowersRepository.save(follow);
  }

  async unfollowUser(followerId: number, followedId: number): Promise<void> {
    await this.FollowersRepository.delete({ follower: { id: followerId }, followed: { id: followedId } });
  }
  async getFollowers(userId: number, page: number, limit: number): Promise<PaginatedResult<User>> {
    const [followers, total] = await this.FollowersRepository.findAndCount({
      where: { followed: { id: userId } },
      relations: ['follower'],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return {
      data: followers.map(follow => follow.follower),
      total,
      page,
      limit,
    };
  }
  
  async getFollowing(userId: number, page: number, limit: number): Promise<PaginatedResult<User>> {
    const [following, total] = await this.FollowersRepository.findAndCount({
      where: { follower: { id: userId } },
      relations: ['followed'],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return {
      data: following.map(follow => follow.followed),
      total,
      page,
      limit,
    };
  }
  
  
}
