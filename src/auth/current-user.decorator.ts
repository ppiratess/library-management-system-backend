import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from 'src/generated/prisma/client';

export interface AuthenticatedRequest extends Request {
  user: Omit<User, 'createdAt'>;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedRequest['user'] => {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return req.user;
  },
);
