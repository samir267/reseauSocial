import { Module } from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { UserSkillsController } from './user-skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkill } from './entities/user-skill.entity';
import { skills } from 'src/skills/entities/skill.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill, skills]),UserModule],
  controllers: [UserSkillsController],
  providers: [UserSkillsService],
})
export class UserSkillsModule {}
