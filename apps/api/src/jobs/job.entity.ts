import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WorkType } from './enums/work-type.enum';
import { Experience } from './enums/experience.enum';
import { EmploymentType } from './enums/employemnt-type.enum';
import { RequiredSkill } from './types/required-skill.type';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  minSalary: number;

  @Column()
  maxSalary: number;

  @Column({
    type: 'enum',
    enum: WorkType,
  })
  workType: WorkType;

  @Column({
    type: 'enum',
    enum: Experience,
  })
  experience: Experience;

  @Column({
    type: 'enum',
    enum: EmploymentType,
  })
  employmentType: EmploymentType;

  @Column({
    type: 'jsonb',
    array: false,
    default: [],
  })
  requiredSkills: RequiredSkill[];
}
