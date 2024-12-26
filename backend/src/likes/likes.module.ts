import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likes])],

  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
