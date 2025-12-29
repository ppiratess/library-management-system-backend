import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ListDto } from 'src/common/dto';

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

  @IsArray()
  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  authorIds: string[];
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear() + 1)
  year?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  totalStock?: number;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  authorIds?: string[];
}

export class GetBookQueryDto extends ListDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minStock?: number;
}
