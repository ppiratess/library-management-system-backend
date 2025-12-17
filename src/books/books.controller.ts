import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/generated/prisma/enums';
import { CreateBookDto } from './dto/books.dto';
import { MockAuthGuard } from 'src/auth/mock-auth.guard';

@Controller('books')
export class BooksController {
  @Post()
  @UseGuards(MockAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: CreateBookDto) {
    return console.log('body', body);
  }
}
