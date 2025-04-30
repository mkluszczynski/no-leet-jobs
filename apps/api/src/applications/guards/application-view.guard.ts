import { Injectable } from '@nestjs/common';
import { AuthorizationGuard } from '@app/auth/guards/authorization.guard';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersService } from 'src/users/users.service';
import { ApplicationsService } from 'src/applications/applications.service';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/accounts/enums/role.enum';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class ApplicationViewGuard extends AuthorizationGuard {
  metadataKey: string = 'authorizeApplicationView';

  constructor(
    private accountsService: AccountsService,
    private usersService: UsersService,
    private companiesService: CompaniesService,
    private applicationsService: ApplicationsService,
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

      const application =
        await this.applicationsService.getFullApplicationById(+id);
      const user = await this.usersService.tryGetUserByEmail(email);
      const company = await this.companiesService.tryGetCompanyByEmail(email);

      console.log('company', company);
      console.log('user', user);
      console.log('application', application);

      if (user && application?.user?.id === user?.id) {
        return true;
      }

      if (company && application?.job?.company?.id === company?.id) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error in ApplicationEditGuard:', error);
      return false;
    }
  }
}
