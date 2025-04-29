import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async dosesAccountExistByEmail(email: string): Promise<boolean> {
    const account = await this.accountRepository.findOneBy({ email });
    return !!account;
  }

  async createAccount(dto: CreateAccountDto, role: Role): Promise<Account> {
    const newAccount = Account.fromDto(dto);

    newAccount.role = role;

    return this.accountRepository.save(newAccount);
  }

  async createUserAccount(dto: CreateAccountDto): Promise<Account> {
    return this.createAccount(dto, Role.USER);
  }

  async createCompanyAccount(dto: CreateAccountDto): Promise<Account> {
    return this.createAccount(dto, Role.COMPANY);
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
