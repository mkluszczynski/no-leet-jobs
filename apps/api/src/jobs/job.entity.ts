import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WorkType } from './enums/work-type.enum';
import { EmploymentType } from './enums/employemnt-type.enum';
import { ExperienceLevel } from './enums/experience-level.enum';
import { RequiredSkill } from './classes/required-skill.class';

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
    enum: ExperienceLevel,
  })
  experience: ExperienceLevel;

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
