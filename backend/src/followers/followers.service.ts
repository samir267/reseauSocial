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
  async getFollowers(userId: number): Promise<User[]> {
    const followers = await this.FollowersRepository.find({
      where: { followed: { id: userId } },
      relations: ['follower'],
    });
  
    return followers.map(follow => follow.follower);
  }
  
  async getFollowing(userId: number): Promise<User[]> {
    const following = await this.FollowersRepository.find({
      where: { follower: { id: userId } },
      relations: ['followed'],
    });
  
    return following.map(follow => follow.followed);
  }
  
  
  
}
