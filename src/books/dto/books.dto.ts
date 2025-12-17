import { IsString, IsArray, ArrayMinSize, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  authors: string[];

  @IsInt()
  @Min(0)
  year: number;

  @IsInt()
  @Min(1)
  totalStock: number;
}
