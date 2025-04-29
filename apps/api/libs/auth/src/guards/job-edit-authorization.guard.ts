import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { Role } from 'src/accounts/enums/role.enum';
import { CompaniesService } from 'src/companies/companies.service';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class JobEditAuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jobsService: JobsService,
    private accountsService: AccountsService,
    private companiesService: CompaniesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isJobCreator = this.reflector.getAllAndOverride<boolean>(
      'validateJobCreator',
      [context.getHandler(), context.getClass()],
    );

    if (!isJobCreator) {
      return true; // If not a job creator check, allow access
    }

    const request = context.switchToHttp().getRequest();
    const userEmail = request.user.email;
    const jobId = request.params.id;

    // Check if the user is the creator of the job
    if (userEmail && jobId) {
      return await this.isJobCreator(userEmail, jobId);
    }

    return false;
  }

  private async isJobCreator(email: string, jobId: string): Promise<boolean> {
    try {
      const account = await this.accountsService.getAccountByEmail(email);

      // Allow admins to modify any job
      if (account.role === Role.ADMIN) {
        return true;
      }

      // Only company accounts can modify jobs
      if (account.role !== Role.COMPANY) {
        return false;
      }

      const job = await this.jobsService.getJobById(+jobId);
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
