import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateBookRentalDto } from './dto/rentals.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async createBookRental(data: CreateBookRentalDto) {
    return await this.prisma.$transaction(async (tx) => {
      await tx.book
        .update({
          where: {
            id: data.bookId,
            availableStock: { gt: 0 },
          },
          data: {
            availableStock: { decrement: 1 },
          },
        })
        .catch(() => {
          throw new Error('Book is not available for rental');
        });

      const bookRental = await tx.rental.create({
        data: {
          ...data,
        },
        select: {
          id: true,
          book: true,
        },
      });

      return {
        message: 'Rental created successfully',
        data: bookRental,
      };
    });
  }
}
