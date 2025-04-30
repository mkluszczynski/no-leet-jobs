import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { Role } from 'src/accounts/enums/role.enum';
import { ApplicationsService } from 'src/applications/applications.service';
import { UsersService } from 'src/users/users.service';
import { AuthorizationGuard } from '@app/auth/guards/authorization.guard';

@Injectable()
export class ApplicationEditGuard extends AuthorizationGuard {
  metadataKey: string = 'authorizeApplicationEdit';

  constructor(
    private accountsService: AccountsService,
    private usersService: UsersService,
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

      if (account.role !== Role.COMPANY) {
        return false;
      }

      const application =
        await this.applicationsService.getFullApplicationById(+id);
      const user = await this.usersService.getUserByAccountId(+account.id);

      return application.user.id === user.id;
    } catch (error) {
      console.error('Error in ApplicationEditGuard:', error);
      return false;
    }
  }
}
