import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { Prisma } from 'src/generated/prisma/client';
import { CreateBookDto, UpdateBookDto } from './dto/books.dto';
import { AuthenticatedRequest } from 'src/auth/current-user.decorator';

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

  async getBookDetail(bookId: string, user: AuthenticatedRequest['user']) {
    const isAuthenticated = !!user;

    const isAdmin = user?.role === 'ADMIN';

    try {
      const book = await this.prisma.book.findUnique({
        where: { id: bookId },
        select: {
          title: true,
          year: true,
          authors: true,
          availableStock: isAuthenticated,
          totalStock: isAuthenticated,
          rentals: isAdmin,
        },
      });

      if (!book) {
        throw new NotFoundException('Book does not exist');
      }

      return book;
    } catch (error) {
      console.error('Error getting book details:', error);
      throw new InternalServerErrorException('Failed to get book details');
    }
  }

  async updateBook(bookId: string, updateBookDto: UpdateBookDto) {
    try {
      const updatedBook = await this.prisma.book.update({
        where: { id: bookId },
        data: updateBookDto,
      });

      return {
        message: 'Book updated successfully',
        data: updatedBook,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Book does not exist');
      }

      console.error('Error updating book:', error);
      throw new InternalServerErrorException('Failed to update book');
    }
  }
}
