import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  authors: string[];

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear() + 1)
  year: number;

  @IsInt()
  @Min(1)
  totalStock: number;
}

export class UpdateBookDto extends PartialType(CreateBookDto) {}
