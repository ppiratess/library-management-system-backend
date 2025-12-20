import { Injectable } from '@nestjs/common';

import { Role } from 'src/generated/prisma/enums';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { CreateUserDto, GetUsersQueryDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        role: dto.role ?? Role.STUDENT,
        password: dto.password,
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

  async getAllUser(query: GetUsersQueryDto) {
    const { page = 1, perPage = 10, role, search } = query;

    const skip = (page - 1) * perPage;

    const where: Prisma.UserWhereInput = {
      ...(role && { role }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [userList, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: perPage,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: userList,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}
