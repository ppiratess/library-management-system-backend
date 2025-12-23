import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }
}
