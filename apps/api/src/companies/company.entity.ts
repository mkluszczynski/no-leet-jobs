import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyDto } from './dto/company.dto';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  public static fromDto(dto: CompanyDto): Company {
    const company = new Company();
    company.name = dto.name;
    company.address = dto.address;
    company.phoneNumber = dto.phoneNumber || null;
    company.email = dto.email;
    company.website = dto.website || null;
    company.createdAt = new Date();
    company.updatedAt = new Date();
    return company;
  }

  // TODO: Refactor to use UpdateCompanyDto
  public updateFromDto(dto: CompanyDto): void {
    this.name = dto.name;
    this.address = dto.address;
    this.phoneNumber = dto.phoneNumber || null;
    this.email = dto.email;
    this.website = dto.website || null;
    this.updatedAt = new Date();
  }
}
