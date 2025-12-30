import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  CreateAuthorDto,
  GetAuthorsDto,
  UpdateAuthorDto,
} from './dto/author.dto';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Post()
  create(@Body() body: CreateAuthorDto) {
    return this.authorService.createAuthor(body);
  }

  @Get(':id')
  getAuthor(@Param('id') id: string) {
    return this.authorService.getAuthor(id);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() body: UpdateAuthorDto) {
    return this.authorService.patchAuthor(id, body);
  }

  @Get()
  getAll(@Query() query: GetAuthorsDto) {
    return this.authorService.getAllAuthors(query);
  }
}
