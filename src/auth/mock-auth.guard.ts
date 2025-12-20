import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from './current-user.decorator';

@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();

    req.user = {
      id: '11111111-1111-1111-1111-111111111111',
      role: 'ADMIN',
      email: 'admin@test.com',
      name: 'Mock Admin',
      password: 'Test@123',
    };

    return true;
  }
}
