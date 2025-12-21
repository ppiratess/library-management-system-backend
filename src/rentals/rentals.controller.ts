import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import {
  ReturnBookDto,
  ExtendRentalDto,
  CreateBookRentalDto,
} from './dto/rentals.dto';
import { RentalsService } from './rentals.service';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalService: RentalsService) {}

  @Post()
  createBookRental(@Body() body: CreateBookRentalDto) {
    return this.rentalService.createBookRental(body);
  }

  @Patch(':id/return')
  returnBook(@Param('id') rentalId: string, @Body() body: ReturnBookDto) {
    return this.rentalService.returnBook(rentalId, body);
  }

  @Patch(':id/extend')
  extendRental(@Param('id') rentalId: string, @Body() body: ExtendRentalDto) {
    return this.rentalService.extendRental(rentalId, body);
  }
}
