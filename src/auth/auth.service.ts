import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/generated/prisma/client';

import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/util/password.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(body: LoginDto) {
    const { email, password } = body;

    const user = await this.usersService.findByEmail(email);

    if (!user) return null;

    const isValid = await comparePassword(password, user.password);

    if (!isValid) return null;

    return user;
  }

  login(user: User) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      role: user.role,
    };
  }
}
