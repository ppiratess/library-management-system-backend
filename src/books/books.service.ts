import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { CreateBookDto } from './dto/books.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(createBookDto: CreateBookDto) {
    try {
      const book = await this.prisma.book.create({
        data: {
          ...createBookDto,
          availableStock: createBookDto.totalStock,
        },
        select: {
          id: true,
          title: true,
        },
      });

      return book;
    } catch (error) {
      console.error('Error creating book:', error);
      throw new InternalServerErrorException('Failed to create book');
    }
  }
}
