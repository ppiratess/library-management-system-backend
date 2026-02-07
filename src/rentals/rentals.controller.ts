import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import {
  ReturnBookDto,
  ExtendRentalDto,
  CreateBookRentalDto,
  GetRentalQueryDto,
} from './dto/rentals.dto';
import { Role } from 'src/generated/prisma/enums';
import { RentalsService } from './rentals.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalService: RentalsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  createBookRental(@Body() body: CreateBookRentalDto) {
    return this.rentalService.createBookRental(body);
  }

  @Patch(':id/return')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  returnBook(@Param('id') rentalId: string, @Body() body: ReturnBookDto) {
    return this.rentalService.returnBook(rentalId, body);
  }

  @Patch(':id/extend')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  extendRental(@Param('id') rentalId: string, @Body() body: ExtendRentalDto) {
    return this.rentalService.extendRental(rentalId, body);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getRental(@Param('id') rentalId: string) {
    return this.rentalService.getRentalById(rentalId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  list(@Query() query: GetRentalQueryDto) {
    return this.rentalService.getAllRentals(query);
  }
}
