import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/accounts/enums/role.enum';
import { REQUIRE_ROLE_KEY } from '../decorators/require-role.decorator';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accountsService: AccountsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      REQUIRE_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userEmail: string | undefined = request?.user?.email;
    console.log('userEmail', userEmail);

    if (!userEmail) {
      return false;
    }

    const user = await this.accountsService.getAccountByEmail(userEmail);

    if (user.role === Role.ADMIN) {
      return true;
    }

    return requiredRoles.some((role) => user.role === role);
  }
}
