import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { Role } from 'src/generated/prisma/enums';
import { MockAuthGuard } from 'src/auth/mock-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CreateBookDto, UpdateBookDto } from './dto/books.dto';
import { type AuthenticatedRequest } from 'src/auth/current-user.decorator';

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
  getBook(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.booksService.getBookDetail(id, req?.user);
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
}
