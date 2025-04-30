import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { Role } from 'src/accounts/enums/role.enum';
import { CompaniesService } from 'src/companies/companies.service';
import { JobsService } from 'src/jobs/jobs.service';
import { AuthorizationGuard } from '@app/auth/guards/authorization.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JobEditGuard extends AuthorizationGuard {
  metadataKey: string = 'validateJobCreator';

  constructor(
    private jobsService: JobsService,
    private accountsService: AccountsService,
    private companiesService: CompaniesService,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  protected async canProceed(email: string, id: string): Promise<boolean> {
    try {
      const account = await this.accountsService.getAccountByEmail(email);

      if (account.role === Role.ADMIN) {
        return true;
      }

      if (account.role !== Role.COMPANY) {
        return false;
      }

      const job = await this.jobsService.getFullJobById(+id);
      const company = await this.companiesService.getCompanyByAccountId(
        account.id,
      );

      return job.company.id === company.id;
    } catch (error) {
      console.error('Error in JobAuthorizationGuard:', error);
      return false;
    }
  }
}
