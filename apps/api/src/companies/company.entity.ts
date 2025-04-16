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

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  website: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  public static fromDto(dto: CompanyDto): Company {
    const company = new Company();
    company.name = dto.name;
    company.address = dto.address;
    company.phoneNumber = dto.phoneNumber;
    company.email = dto.email;
    company.website = dto.website;
    company.createdAt = new Date();
    company.updatedAt = new Date();
    return company;
  }

  public updateFromDto(dto: CompanyDto): void {
    this.name = dto.name;
    this.address = dto.address;
    this.phoneNumber = dto.phoneNumber;
    this.email = dto.email;
    this.website = dto.website;
    this.updatedAt = new Date();
  }
}
