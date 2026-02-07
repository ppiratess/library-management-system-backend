import { ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { Role } from 'src/generated/prisma/enums';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto, GetUsersQueryDto } from './dto/users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() body: CreateUserDto) {
    return this.usersService.registerUser(body);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  get(@Query() query: GetUsersQueryDto) {
    return this.usersService.getAllUser(query);
  }
}
