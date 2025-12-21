import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from 'src/generated/prisma/client';
import { CreateBookDto, GetBookQueryDto, UpdateBookDto } from './dto/books.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(dto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        ...dto,
        availableStock: dto.totalStock,
      },
      select: {
        id: true,
        title: true,
      },
    });

    return {
      message: 'Book created successfully',
      data: book,
    };
  }

  async getBookDetail(bookId: string, user?: Pick<User, 'role'>) {
    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'ADMIN';

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
  }

  async updateBook(bookId: string, dto: UpdateBookDto) {
    const updatedBook = await this.prisma.book.update({
      where: { id: bookId },
      data: dto,
    });

    return {
      message: 'Book updated successfully',
      data: updatedBook,
    };
  }

  async deleteBook(bookId: string) {
    await this.prisma.book.delete({
      where: { id: bookId },
    });

    return { message: 'Book deleted successfully' };
  }

  async getAllBook(query: GetBookQueryDto) {
    const { page = 1, perPage = 10, search, minStock } = query;

    const skip = (page - 1) * perPage;

    const where: Prisma.BookWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { authors: { has: search } },
        ],
      }),

      ...(minStock !== undefined && {
        availableStock: {
          gte: Number(minStock),
        },
      }),
    };

    const [bookList, total] = await Promise.all([
      this.prisma.book.findMany({
        skip,
        take: perPage,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data: bookList,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}
