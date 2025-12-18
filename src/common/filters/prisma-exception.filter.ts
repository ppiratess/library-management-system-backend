import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Prisma } from 'src/generated/prisma/client';

type PrismaErrorCode = Prisma.PrismaClientKnownRequestError['code'];

const PRISMA_ERROR_MAP: Record<
  PrismaErrorCode,
  { status: HttpStatus; message: string }
> = {
  P2025: {
    status: HttpStatus.NOT_FOUND,
    message: 'Resource not found',
  },
  P2002: {
    status: HttpStatus.CONFLICT,
    message: 'Unique constraint violation',
  },
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error =
      PRISMA_ERROR_MAP[exception.code] ??
      ({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Database error',
      } satisfies { status: HttpStatus; message: string });

    return response.status(error.status).json({
      message: error.message,
    });
  }
}
