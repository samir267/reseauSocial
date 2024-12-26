import { Injectable } from '@nestjs/common';
import { CreateUserSkillDto } from './dto/create-user-skill.dto';
import { UpdateUserSkillDto } from './dto/update-user-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserSkill } from './entities/user-skill.entity';
import { skills } from 'src/skills/entities/skill.entity';

@Injectable()
export class UserSkillsService {
  constructor(
    @InjectRepository(UserSkill)
    private readonly userSkillRepository: Repository<UserSkill>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(skills)
    private readonly skillRepository: Repository<skills>,
  ) {}

  async addSkillToUser(userId: number, skillId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const skill = await this.skillRepository.findOne({ where: { id: skillId } });

    if (!user || !skill) {
      throw new Error('User or skill not found');
    }

    const userSkill = this.userSkillRepository.create({ user, skill });
    return this.userSkillRepository.save(userSkill);
  }

  async findSkillsByUser(userId: number) {
    return this.userSkillRepository.find({
      where: { user: { id: userId } },
      relations: ['skill'], // Inclure les informations des compétences
    });
  }

}
