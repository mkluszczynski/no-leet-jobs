import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CompanyDto } from './dto/company.dto';
import { Account } from 'src/accounts/account.entity';

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

  async getCompanyByAccountId(accountId: number): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { account: { id: accountId } },
    });
    if (!company) {
      throw new NotFoundException(
        `Company with account id ${accountId} not found`,
      );
    }
    return company;
  }

  async getCompanyByAccountEmail(email: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { account: { email } },
    });
    if (!company) {
      throw new NotFoundException(`Company with email ${email} not found`);
    }
    return company;
  }

  async tryGetCompanyByEmail(email: string): Promise<Company | null> {
    if (!email) return null;
    return this.companyRepository.findOne({
      where: { account: { email } },
    });
  }

  async createCompanyFromDtoAndAccount(
    dto: CompanyDto,
    account: Account,
  ): Promise<Company> {
    const company = Company.fromDto(dto);
    company.account = account;
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
