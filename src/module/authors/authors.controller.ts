import { Body, Controller, Post } from '@nestjs/common';

import { CreateAuthorDto } from './dto/author.dto';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Post()
  create(@Body() body: CreateAuthorDto) {
    return this.authorService.createAuthor(body);
  }
}
