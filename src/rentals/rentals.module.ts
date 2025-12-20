import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma.module';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';

@Module({
  imports: [PrismaModule],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}
