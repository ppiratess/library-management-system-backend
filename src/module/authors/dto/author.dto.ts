import { IsString, MinLength } from 'class-validator';

import { ListDto } from 'src/common/dto';

export class CreateAuthorDto {
  @IsString()
  @MinLength(3)
  name: string;
}

export class UpdateAuthorDto extends CreateAuthorDto {}

export class GetAuthorsDto extends ListDto {}
