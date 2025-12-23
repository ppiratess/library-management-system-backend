import { Role } from 'src/generated/prisma/enums';

export interface JwtPayload {
  sub: string;
  role: Role;
}

export interface AuthUser {
  id: string;
  role: Role;
}
