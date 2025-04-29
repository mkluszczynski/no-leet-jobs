import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from './edit.guard';
import { AccountsService } from 'src/accounts/accounts.service';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/accounts/enums/role.enum';
import { CompaniesService } from 'src/companies/companies.service';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class JobViewGuard extends AuthorizationGuard {
  metadataKey: string = 'authorizeJobView';

  constructor(
    private accountsService: AccountsService,
    private companiesService: CompaniesService,
    private jobsService: JobsService,
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

      const job = await this.jobsService.getFullJobById(+id);
      const company =
        await this.companiesService.getCompanyByAccountEmail(email);

      if (job.company.id === company.id) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error in ApplicationEditGuard:', error);
      return false;
    }
  }
}
