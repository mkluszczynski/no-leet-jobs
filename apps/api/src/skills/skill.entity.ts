import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RequiredSkill } from '../required-skills/required-skill.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RequiredSkill, (requiredSkill) => requiredSkill.skill)
  requiredSkills: RequiredSkill[];
}
