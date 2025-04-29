import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export abstract class AuthorizationGuard implements CanActivate {
  abstract metadataKey: string;

  constructor(protected reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const containsMetadata = this.reflector.getAllAndOverride<boolean>(
      this.metadataKey,
      [context.getHandler(), context.getClass()],
    );

    if (!containsMetadata) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userEmail = request.user.email;
    const id = request.params.id;

    if (userEmail && id) {
      return await this.canProceed(userEmail, id);
    }

    return false;
  }

  protected abstract canProceed(email: string, id: string): Promise<boolean>;
}
