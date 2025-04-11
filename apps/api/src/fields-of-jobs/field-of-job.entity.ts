import { Job } from 'src/jobs/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FieldOfJobDto } from './dto/field-of-job.dto';

@Entity()
export class FieldOfJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @OneToMany(() => Job, (job) => job.fieldOfJob)
  jobs: Job[];

  public updateFromDto(dto: FieldOfJobDto) {
    this.name = dto.name;
    this.alias = dto.alias;
    return this;
  }
}
