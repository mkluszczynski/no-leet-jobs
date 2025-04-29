import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkType } from './enums/work-type.enum';
import { EmploymentType } from './enums/employemnt-type.enum';
import { ExperienceLevel } from './enums/experience-level.enum';
import { FieldOfJob } from 'src/fields-of-jobs/field-of-job.entity';
import { RequiredSkill } from 'src/required-skills/required-skill.entity';
import { JobDto } from './dto/job.dto';
import { Company } from 'src/companies/company.entity';
import { Application } from 'src/applications/application.entity';

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

  @ManyToOne(() => FieldOfJob, (field) => field.jobs)
  fieldOfJob: FieldOfJob;

  @JoinTable()
  @ManyToMany(() => RequiredSkill, (requiredSkill) => requiredSkill.jobs)
  requiredSkills: RequiredSkill[];

  @JoinColumn()
  @ManyToOne(() => Company, (company) => company.jobs, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @OneToMany(() => Application, (application) => application.job)
  applications: Application[];

  //TODO: Refactor to separated dtos
  public static fromDto(dto: Omit<JobDto, 'requiredSkills' | 'fieldOfJob'>) {
    const job = new Job();
    job.title = dto.title;
    job.alias = dto.alias;
    job.description = dto.description;
    job.minSalary = dto.minSalary;
    job.maxSalary = dto.maxSalary;
    job.workType = dto.workType;
    job.experience = dto.experience;
    job.employmentType = dto.employmentType;
    return job;
  }

  public updateFromDto(dto: JobDto) {
    this.title = dto.title;
    this.alias = dto.alias;
    this.description = dto.description;
    this.minSalary = dto.minSalary;
    this.maxSalary = dto.maxSalary;
    this.experience = dto.experience;
    this.employmentType = dto.employmentType;
    return this;
  }
}
