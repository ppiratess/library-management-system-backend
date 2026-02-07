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
  CreateAuthorDto,
  GetAuthorsDto,
  UpdateAuthorDto,
} from './dto/author.dto';
import { Role } from 'src/generated/prisma/enums';
import { AuthorsService } from './authors.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() body: CreateAuthorDto) {
    return this.authorService.createAuthor(body);
  }

  @Get(':id')
  getAuthor(@Param('id') id: string) {
    return this.authorService.getAuthor(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  patch(@Param('id') id: string, @Body() body: UpdateAuthorDto) {
    return this.authorService.patchAuthor(id, body);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getAll(@Query() query: GetAuthorsDto) {
    return this.authorService.getAllAuthors(query);
  }
}
