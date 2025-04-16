import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getAllCompanies(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async getCompanyById(id: number): Promise<Company> {
    const company = this.companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    return company;
  }

  async createCompanyFromDto(dto: CompanyDto): Promise<Company> {
    const company = Company.fromDto(dto);
    return this.companyRepository.save(company);
  }

  async updateCompanyFromDto(id: number, dto: CompanyDto): Promise<Company> {
    const company = await this.getCompanyById(id);
    company.updateFromDto(dto);
    return this.companyRepository.save(company);
  }

  async deleteCompany(id: number): Promise<void> {
    const company = await this.getCompanyById(id);
    await this.companyRepository.remove(company);
  }
}
