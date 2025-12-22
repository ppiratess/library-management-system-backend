import { BadRequestException, Injectable } from '@nestjs/common';

import {
  CreateBookRentalDto,
  ExtendRentalDto,
  GetRentalQueryDto,
  ReturnBookDto,
} from './dto/rentals.dto';
import { PrismaService } from 'src/prisma.service';
import { RentalStatus } from 'src/generated/prisma/enums';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async createBookRental(data: CreateBookRentalDto) {
    return await this.prisma.$transaction(async (tx) => {
      const updated = await tx.book.updateMany({
        where: { id: data.bookId, availableStock: { gt: 0 } },
        data: { availableStock: { decrement: 1 } },
      });

      if (updated.count === 0) throw new BadRequestException('Out of stock');

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
        success: true,
        message: 'Rental created successfully',
        data: bookRental,
      };
    });
  }

  async returnBook(rentalId: string, data: ReturnBookDto) {
    return await this.prisma.$transaction(async (tx) => {
      const existingRental = await tx.rental.findUnique({
        where: { id: rentalId },
      });

      if (!existingRental) {
        throw new Error('Rental record not found');
      }

      if (existingRental.returnedAt) {
        throw new Error('This book has already been returned');
      }

      const returnDate = new Date(data.returnedAt);

      if (returnDate < existingRental.rentedAt) {
        throw new Error('Return date cannot be earlier than rented date');
      }

      const isLate = returnDate > existingRental.dueAt;

      let daysLate = 0;
      if (isLate) {
        const diffTime = returnDate.getTime() - existingRental.dueAt.getTime();
        daysLate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }

      const [updatedRental] = await Promise.all([
        tx.rental.update({
          where: { id: rentalId },
          data: {
            returnedAt: returnDate,
            status: isLate ? RentalStatus.LATE_RETURN : RentalStatus.RETURNED,
          },
        }),
        tx.book.update({
          where: { id: existingRental.bookId },
          data: {
            availableStock: { increment: 1 },
          },
        }),
      ]);

      return {
        message: isLate
          ? `Returned late by ${daysLate} days`
          : 'Book returned successfully',
        data: updatedRental,
      };
    });
  }

  async extendRental(rentalId: string, data: ExtendRentalDto) {
    const rental = await this.prisma.rental.findUnique({
      where: { id: rentalId },
    });

    if (!rental) {
      throw new Error('Rental record not found');
    }

    if (rental.returnedAt) {
      throw new Error('Cannot extend a returned rental');
    }

    if (rental.extended) {
      throw new Error('Rental has already been extended');
    }

    const newDueDate = new Date(data.dueAt);

    if (newDueDate <= rental.dueAt) {
      throw new Error('New due date must be later than current due date');
    }

    const extendedDays = Math.ceil(
      (newDueDate.getTime() - rental.dueAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    const updatedRental = await this.prisma.rental.update({
      where: { id: rentalId },
      data: {
        dueAt: newDueDate,
        status: RentalStatus.EXTENDED,
        extended: true,
        extendedDays,
      },
    });

    return {
      message: 'Rental period extended successfully',
      data: updatedRental,
    };
  }

  async getRentalById(id: string) {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      throw new Error('Rental record not found');
    }

    return {
      data: rental,
    };
  }

  async getAllRentals(query: GetRentalQueryDto) {
    const { page = 1, perPage = 10, status, userId } = query;

    const skip = (page - 1) * perPage;

    const where: Prisma.RentalWhereInput = {
      ...(status && {
        status: { in: status },
      }),
      ...(userId && {
        userId: { in: userId },
      }),
    };

    const [rentalList, total] = await Promise.all([
      this.prisma.rental.findMany({
        skip,
        take: perPage,
        where,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.rental.count({ where }),
    ]);

    return {
      data: rentalList,
      meta: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }
}
