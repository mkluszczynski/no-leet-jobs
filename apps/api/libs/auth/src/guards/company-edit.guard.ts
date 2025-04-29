import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class CompanyEditGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountsService: AccountsService,
    private companiesService: CompaniesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isJobCreator = this.reflector.getAllAndOverride<boolean>(
      'authorizeCompanyEdit',
      [context.getHandler(), context.getClass()],
    );

    if (!isJobCreator) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userEmail = request.user.email;
    const id = request.params.id;

    if (userEmail && id) {
      return await this.canEdit(userEmail, id);
    }

    return false;
  }

  private async canEdit(email: string, jobId: string): Promise<boolean> {
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
