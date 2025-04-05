import { Job } from 'src/jobs/job.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
