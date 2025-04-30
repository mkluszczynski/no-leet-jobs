import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { CompaniesService } from 'src/companies/companies.service';
import { AuthorizationGuard } from '@app/auth/guards/authorization.guard';

@Injectable()
export class CompanyEditGuard extends AuthorizationGuard {
  metadataKey: string = 'authorizeCompanyEdit';

  constructor(
    private accountsService: AccountsService,
    private companiesService: CompaniesService,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  protected async canProceed(email: string, jobId: string): Promise<boolean> {
    try {
      const account = await this.accountsService.getAccountByEmail(email);
      const company = await this.companiesService.getCompanyById(+jobId);

      return account.id === company.account.id;
    } catch (error) {
      console.error('Error in ApplicationEditGuard:', error);
      return false;
    }
  }
}
