import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from 'src/generated/prisma/client';
import { CreateBookDto, GetBookQueryDto, UpdateBookDto } from './dto/books.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  async createBook(dto: CreateBookDto) {
    const authorsCount = await this.prisma.author.count({
      where: { id: { in: dto.authorIds } },
    });

    if (authorsCount !== dto.authorIds.length) {
      throw new BadRequestException('One or more authors do not exist');
    }

    const book = await this.prisma.book.create({
      data: {
        ...dto,
        availableStock: dto.totalStock,
        authors: {
          create: dto.authorIds.map((authorId) => ({
            author: {
              connect: {
                id: authorId,
              },
            },
          })),
        },
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
    const { authorIds, totalStock, ...bookData } = dto;

    return this.prisma.$transaction(async (tx) => {
      // Fetch current stock (needed if totalStock changes)
      const existingBook = await tx.book.findUnique({
        where: { id: bookId },
        select: { totalStock: true, availableStock: true },
      });

      if (!existingBook) {
        throw new NotFoundException('Book not found');
      }

      const data: Prisma.BookUpdateInput = {
        ...bookData,
      };

      // Handle stock consistency
      if (totalStock !== undefined) {
        const diff = totalStock - existingBook.totalStock;
        data.totalStock = totalStock;
        data.availableStock = existingBook.availableStock + diff;
      }

      // Replace authors if provided
      if (authorIds) {
        data.authors = {
          deleteMany: {}, // remove all existing links
          create: authorIds.map((authorId) => ({
            author: {
              connect: { id: authorId },
            },
          })),
        };
      }

      const updatedBook = await tx.book.update({
        where: { id: bookId },
        data,
      });

      return {
        message: 'Book updated successfully',
        data: updatedBook,
      };
    });
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
          {
            authors: {
              some: {
                author: {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
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
