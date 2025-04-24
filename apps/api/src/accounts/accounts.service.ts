import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/companies/company.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Role } from './enums/role.enum';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async getAllAccounts(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async getAccountById(id: number): Promise<Account> {
    const account = this.accountRepository.findOneBy({ id });

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    return account;
  }

  async getAccountByEmail(email: string): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ email });

    if (!account) {
      throw new NotFoundException(`Account with email ${email} not found`);
    }

    return account;
  }

  async createUserAccount(dto: CreateAccountDto, user: User): Promise<Account> {
    const newAccount = Account.fromDto(dto);

    newAccount.role = Role.USER;
    newAccount.user = user;

    return this.accountRepository.save(newAccount);
  }

  async createCompanyAccount(
    dto: CreateAccountDto,
    company: Company,
  ): Promise<Account> {
    const newAccount = Account.fromDto(dto);

    newAccount.role = Role.COMPANY;
    newAccount.company = company;

    return this.accountRepository.save(newAccount);
  }

  async updateAccountById(id: number, dto: UpdateAccountDto): Promise<Account> {
    const account = await this.getAccountById(id);

    account.updateFromDto(dto);

    return this.accountRepository.save(account);
  }

  async deleteAccountById(id: number): Promise<void> {
    const account = await this.getAccountById(id);

    await this.accountRepository.remove(account);
  }
}
