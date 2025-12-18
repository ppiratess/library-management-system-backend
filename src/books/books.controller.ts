import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './dto/books.dto';
import { Role } from 'src/generated/prisma/enums';
import { MockAuthGuard } from 'src/auth/mock-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(MockAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: CreateBookDto) {
    return this.booksService.createBook(body);
  }
}
