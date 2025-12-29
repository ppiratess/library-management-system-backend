import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAuthorDto } from './dto/author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async createAuthor(body: CreateAuthorDto) {
    const author = await this.prisma.author.create({
      data: {
        name: body.name,
      },
    });

    return {
      message: 'Author created successfully',
      data: author,
    };
  }
}
