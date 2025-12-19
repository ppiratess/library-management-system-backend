import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { Role } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        role: dto.role ?? Role.STUDENT,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      message: 'User registered successfully',
      data: user,
    };
  }
}
