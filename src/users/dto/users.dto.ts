import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { ListDto } from 'src/common/dto';
import { Role } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @MinLength(3)
  password: string;
}

export class GetUsersQueryDto extends ListDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
