import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ListDto } from 'src/common/dto';
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

export class GetBookQueryDto extends ListDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minStock?: number;
}
