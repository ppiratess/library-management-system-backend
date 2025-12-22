import { PickType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ListDto } from 'src/common/dto';
import { RentalStatus } from 'src/generated/prisma/enums';

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

export class GetRentalQueryDto extends ListDto {
  @IsOptional()
  @IsArray()
  @IsEnum(RentalStatus, { each: true })
  status?: RentalStatus[];

  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  userId?: string[];
}
