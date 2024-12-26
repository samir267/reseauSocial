import { UserSkill } from "src/user-skills/entities/user-skill.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('skills')
export class skills {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => UserSkill, (userSkill) => userSkill.skill)
    userSkills: UserSkill[];

}
