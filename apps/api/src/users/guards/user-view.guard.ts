import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { AuthorizationGuard } from '@app/auth/guards/authorization.guard';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserViewGuard extends AuthorizationGuard {
  metadataKey: string = 'authorizeUserView';

  constructor(
    private accountsService: AccountsService,
    private usersService: UsersService,
    reflector: Reflector,
  ) {
    super(reflector);
  }

  protected async canProceed(email: string, id: string): Promise<boolean> {
    try {
      const account = await this.accountsService.getAccountByEmail(email);
      const user = await this.usersService.getUserByAccountId(+id);

      return account.id === user.account.id;
    } catch (error) {
      console.error('Error in ApplicationEditGuard:', error);
      return false;
    }
  }
}
