import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { Role } from 'src/accounts/enums/role.enum';
import { ApplicationsService } from 'src/applications/applications.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ApplicationEditGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountsService: AccountsService,
    private usersService: UsersService,
    private applicationsService: ApplicationsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isJobCreator = this.reflector.getAllAndOverride<boolean>(
      'authorizeApplicationEdit',
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

  private async canEdit(email: string, id: string): Promise<boolean> {
    try {
      const account = await this.accountsService.getAccountByEmail(email);

      if (account.role === Role.ADMIN) {
        return true;
      }

      if (account.role !== Role.COMPANY) {
        return false;
      }

      const application =
        await this.applicationsService.getApplicationById(+id);
      const user = await this.usersService.getUserByAccountId(+account.id);

      return application.user.id === user.id;
    } catch (error) {
      console.error('Error in ApplicationEditGuard:', error);
      return false;
    }
  }
}
