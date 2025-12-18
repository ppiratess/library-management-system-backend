import { Module } from '@nestjs/common';

import { BooksService } from './books.service';
import { PrismaModule } from 'src/prisma.module';
import { BooksController } from './books.controller';

@Module({
  imports: [PrismaModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
