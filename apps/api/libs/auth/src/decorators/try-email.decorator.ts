import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TryEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | null => {
    const request = ctx.switchToHttp().getRequest();
    const email = request?.user?.email;

    return email || null;
  },
);
