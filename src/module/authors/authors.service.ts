import { Injectable } from '@nestjs/common';

import {
  CreateAuthorDto,
  GetAuthorsDto,
  UpdateAuthorDto,
} from './dto/author.dto';
import { PrismaService } from 'src/prisma.service';
import { AUTHORS_RAW_QUERY } from './queries/raw-queries';

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

  async getAuthor(id: string) {
    const author = await this.prisma
      .$queryRaw`${AUTHORS_RAW_QUERY.getAuthorById(id)}`;

    return {
      message: 'Author detail fetched successfully',
      data: author,
    };
  }

  async patchAuthor(id: string, body: UpdateAuthorDto) {
    await this.prisma
      .$queryRaw`${AUTHORS_RAW_QUERY.updateAuthorById(id, body)}`;

    const author = await this.prisma
      .$queryRaw`${AUTHORS_RAW_QUERY.getAuthorById(id)}`;

    return {
      message: 'Author updated successfully',
      data: author,
    };
  }

  async getAllAuthors(query: GetAuthorsDto) {
    const author = await this.prisma
      .$queryRaw`${AUTHORS_RAW_QUERY.getAllAuthors(query)}`;

    return {
      message: 'Authors fetched successfully',
      data: author,
    };
  }
}
