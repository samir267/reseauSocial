import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { skills } from './entities/skill.entity';

@Injectable()
export class SkillsService {

  constructor(
    @InjectRepository(skills)
    private readonly skillRepository: Repository<skills>,
  ){}


  create(createSkillDto: CreateSkillDto) {
    const newSkill = this.skillRepository.create(createSkillDto);
    return this.skillRepository.save(newSkill).catch((error) => {
      throw new BadRequestException('Error creating skill: ' + error.message);
    });
  }
  

  findAll() {
    return this.skillRepository.find();
  }

  findOne(id: number) {
    return this.skillRepository.findOne({where:{id}});
  }

  update(id: number, updateSkillDto: UpdateSkillDto) {
    return this.skillRepository.update(id, updateSkillDto);
  }

  remove(id: number) {
    return this.skillRepository.delete(id);
  }
}
