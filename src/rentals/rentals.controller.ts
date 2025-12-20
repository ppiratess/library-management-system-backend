import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { RentalsService } from './rentals.service';
import { CreateBookRentalDto, ReturnBookDto } from './dto/rentals.dto';

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
}
