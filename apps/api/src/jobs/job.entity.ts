import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkType } from './enums/work-type.enum';
import { EmploymentType } from './enums/employemnt-type.enum';
import { ExperienceLevel } from './enums/experience-level.enum';
import { RequiredSkill } from './classes/required-skill.class';
import { FieldOfJob } from 'src/fields-of-jobs/field-of-job.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  alias: string;

  @Column()
  description: string;

  @Column()
  minSalary: number;

  @Column()
  maxSalary: number;

  @ManyToOne(() => FieldOfJob, (field) => field.jobs)
  fieldOfJob: FieldOfJob;

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
