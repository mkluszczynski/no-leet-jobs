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
import { UsersService } from 'src/users/users.service';
import { CompaniesService } from 'src/companies/companies.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { HashService } from '@app/hash';
import { RegisterUserAccountDto } from './dto/register-user-account.dto';
import { RegisterCompanyAccountDto } from './dto/register-company-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
    private readonly hashService: HashService,
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
    @Body() dto: RegisterUserAccountDto,
  ): Promise<Account> {
    const user = await this.usersService.createUserFromDto(dto);
    dto.password = await this.hashService.hashPassword(dto.password);
    const account = await this.accountsService.createUserAccount(dto, user);
    return account;
  }

  @Post('/register/company')
  async createCompanyAccount(
    @Body() dto: RegisterCompanyAccountDto,
  ): Promise<Account> {
    const company = await this.companiesService.createCompanyFromDto(dto);
    dto.password = await this.hashService.hashPassword(dto.password);
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
