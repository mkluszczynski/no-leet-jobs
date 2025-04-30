import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountsService } from 'src/accounts/accounts.service';
import { Role } from 'src/accounts/enums/role.enum';
import { AuthorizationGuard } from '@app/auth/guards/authorization.guard';

@Injectable()
export class AccountEditGuard extends AuthorizationGuard {
  metadataKey: string = 'authorizeAccountEdit';

  constructor(
    private accountsService: AccountsService,
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

      const editedAccount = await this.accountsService.getAccountById(+id);

      return account.id === editedAccount.id;
    } catch (error) {
      console.error('Error in ApplicationEditGuard:', error);
      return false;
    }
  }
}
