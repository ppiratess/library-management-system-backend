import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, GetUsersQueryDto } from './dto/users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() body: CreateUserDto) {
    return this.usersService.registerUser(body);
  }

  @Get()
  get(@Query() query: GetUsersQueryDto) {
    return this.usersService.getAllUser(query);
  }
}
