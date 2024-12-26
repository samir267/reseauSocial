import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { skills } from 'src/skills/entities/skill.entity';

@Entity('user_skills')
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userSkills, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => skills, (skill) => skill.userSkills, { onDelete: 'CASCADE' })
  skill: skills;


}
