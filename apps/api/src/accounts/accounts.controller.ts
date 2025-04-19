import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { IdParam } from 'src/utils/common/ByIdParam';
import { CreateAccountDto } from './dto/create-account.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CompaniesService } from 'src/companies/companies.service';
import { CompanyDto } from 'src/companies/dto/company.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Get()
  getAllAccounts(): Promise<Account[]> {
    return this.accountsService.getAllAccounts();
  }

  @Get(':id')
  getAccountById(@Param() params: IdParam): Promise<Account> {
    return this.accountsService.getAccountById(params.id);
  }

  @Post('/register/user')
  async createUserAccount(
    @Body() dto: CreateAccountDto & CreateUserDto,
  ): Promise<Account> {
    const user = await this.usersService.createUserFromDto(dto);
    const account = await this.accountsService.createUserAccount(dto, user);
    return account;
  }

  @Post('/register/company')
  async createCompanyAccount(
    @Body() dto: CreateAccountDto & CompanyDto,
  ): Promise<Account> {
    const company = await this.companiesService.createCompanyFromDto(dto);
    const account = await this.accountsService.createCompanyAccount(
      dto,
      company,
    );
    return account;
  }

  @Put(':id')
  async updateAccountById(
    @Param() params: IdParam,
    @Body() dto: UpdateAccountDto,
  ): Promise<Account> {
    const account = await this.accountsService.updateAccountById(
      params.id,
      dto,
    );
    return account;
  }

  @Delete(':id')
  async deleteAccountById(@Param() params: IdParam): Promise<void> {
    await this.accountsService.deleteAccountById(params.id);
  }
}
