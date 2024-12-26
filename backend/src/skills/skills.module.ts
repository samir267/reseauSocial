import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { skills } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([skills])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
