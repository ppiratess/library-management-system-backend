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
  ReturnBookDto,
  ExtendRentalDto,
  CreateBookRentalDto,
  GetRentalQueryDto,
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

  @Get(':id')
  getRental(@Param('id') rentalId: string) {
    return this.rentalService.getRentalById(rentalId);
  }

  @Get()
  list(@Query() query: GetRentalQueryDto) {
    return this.rentalService.getAllRentals(query);
  }
}
