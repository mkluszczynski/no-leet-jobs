import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationDto } from './dto/application.dto';
import { User } from 'src/users/user.entity';
import { Job } from 'src/jobs/job.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  createdAt: Date;

  @Column()
  resumePath: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.applications, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User | null;

  @JoinColumn()
  @ManyToOne(() => Job, (job) => job.applications, { onDelete: 'CASCADE' })
  job: Job;

  public static fromDto(dto: ApplicationDto): Application {
    const application = new Application();
    application.firstName = dto.firstName;
    application.lastName = dto.lastName;
    application.email = dto.email;
    application.phone = dto.phone;
    application.createdAt = new Date();
    application.resumePath = '';
    return application;
  }

  updateFromDto(dto: ApplicationDto): void {
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.email = dto.email;
    this.phone = dto.phone;
  }
}
