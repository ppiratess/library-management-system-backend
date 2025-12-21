import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { Role } from 'src/generated/prisma/enums';
import { type User } from 'src/generated/prisma/client';
import { MockAuthGuard } from 'src/auth/mock-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CreateBookDto, GetBookQueryDto, UpdateBookDto } from './dto/books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(MockAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: CreateBookDto) {
    return this.booksService.createBook(body);
  }

  @Get(':id')
  @UseGuards(MockAuthGuard)
  getBook(@Param('id') id: string, @CurrentUser() user?: User) {
    return this.booksService.getBookDetail(id, user);
  }

  @Patch(':id')
  @UseGuards(MockAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() body: UpdateBookDto) {
    return this.booksService.updateBook(id, body);
  }

  @Delete(':id')
  @UseGuards(MockAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }

  @Get()
  list(@Query() query: GetBookQueryDto) {
    return this.booksService.getAllBook(query);
  }
}
