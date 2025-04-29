import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const Email = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const email = request?.user?.email;

    if (!email) {
      throw new UnauthorizedException('Email not found in request');
    }

    return email;
  },
);
