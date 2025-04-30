import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyDto } from './dto/company.dto';
import { Job } from 'src/jobs/job.entity';
import { Account } from 'src/accounts/account.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(() => Account, {
    onDelete: 'CASCADE',
  })
  account: Account;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phoneNumber: string | null;

  @Column()
  email: string;

  @Column({ nullable: true })
  website: string | null;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Job, (job) => job.company, { onDelete: 'CASCADE' })
  jobs: Job[];

  public static fromDto(dto: CompanyDto): Company {
    const company = new Company();
    company.name = dto.name;
    company.address = dto.address;
    company.phoneNumber = dto.phoneNumber || null;
    company.email = dto.email;
    company.website = dto.website || null;
    return company;
  }

  // TODO: Refactor to use UpdateCompanyDto
  public updateFromDto(dto: CompanyDto): void {
    this.name = dto.name;
    this.address = dto.address;
    this.phoneNumber = dto.phoneNumber || null;
    this.email = dto.email;
    this.website = dto.website || null;
  }
}
