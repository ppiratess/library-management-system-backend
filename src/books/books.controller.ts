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
import { ApiBearerAuth } from '@nestjs/swagger';

import { BooksService } from './books.service';
import { Role } from 'src/generated/prisma/enums';
import { type User } from 'src/generated/prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateBookDto, GetBookQueryDto, UpdateBookDto } from './dto/books.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: CreateBookDto) {
    return this.booksService.createBook(body);
  }

  @Get(':id')
  getBook(@Param('id') id: string, @CurrentUser() user?: User) {
    return this.booksService.getBookDetail(id, user);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() body: UpdateBookDto) {
    return this.booksService.updateBook(id, body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }

  @Get()
  list(@Query() query: GetBookQueryDto) {
    return this.booksService.getAllBook(query);
  }
}
