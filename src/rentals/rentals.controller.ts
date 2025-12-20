import { Body, Controller, Post } from '@nestjs/common';

import { RentalsService } from './rentals.service';
import { CreateBookRentalDto } from './dto/rentals.dto';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalService: RentalsService) {}

  @Post()
  createBookRental(@Body() body: CreateBookRentalDto) {
    return this.rentalService.createBookRental(body);
  }
}
