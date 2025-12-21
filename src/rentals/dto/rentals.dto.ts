import { PickType } from '@nestjs/mapped-types';
import { IsDateString, IsUUID } from 'class-validator';

export class CreateBookRentalDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  bookId: string;

  @IsDateString()
  rentedAt: string;

  @IsDateString()
  dueAt: string;
}

export class ReturnBookDto {
  @IsDateString()
  returnedAt: string;
}

export class ExtendRentalDto extends PickType(CreateBookRentalDto, ['dueAt']) {}
