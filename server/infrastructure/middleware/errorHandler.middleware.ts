import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import multer from 'multer';

import { ErrorResponseProps } from '@/infrastructure/middleware/type';
import { AppError, CloudinaryError } from '@/infrastructure/errors/customErrors';
import { handlePrismaError } from '@/utils/handlePrismaError';

export const errorHandler: ErrorRequestHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error({
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });

  const defaultErrorResponse: ErrorResponseProps = {
    status: 'error',
    message: 'Something went wrong, Internal Server Error',
  };

  let errorResponse = { ...defaultErrorResponse };

  // Custom App Errors
  if (error instanceof AppError) {
    errorResponse = {
      status: error.statusCode < 500 ? 'fail' : 'error',
      message: error.message,
    };
    res.status(error.statusCode).json(errorResponse);
    return;
  }

  // Prisma Errors
  if (error instanceof PrismaClientKnownRequestError) {
    errorResponse = handlePrismaError(error);
    res.status(errorResponse.status === 'fail' ? 400 : 500).json(errorResponse);
    return;
  }

  if (error instanceof PrismaClientValidationError) {
    errorResponse = {
      status: 'fail',
      message: 'Invalid data provided',
    };
    res.status(400).json(errorResponse);
    return;
  }

  // Multer Errors
  if (error instanceof multer.MulterError) {
    errorResponse = {
      status: 'fail',
      message: error.message,
    };
    res.status(400).json(errorResponse);
    return;
  }

  // JWT Errors
  if (error instanceof JsonWebTokenError) {
    errorResponse = {
      status: 'fail',
      message: 'Invalid token',
    };
    res.status(401).json(errorResponse);
    return;
  }

  if (error instanceof TokenExpiredError) {
    errorResponse = {
      status: 'fail',
      message: 'Token has expired',
    };
    res.status(401).json(errorResponse);
    return;
  }

  // Cloudinary Errors
  if (error instanceof CloudinaryError) {
    errorResponse = {
      status: 'error',
      message: error.message,
    };
    res.status(500).json(errorResponse);
    return;
  }

  // Validation Errors
  if (error.name === 'ValidationError') {
    errorResponse = {
      status: 'fail',
      message: 'Validation failed',
      errors: (error as any).errors,
    };
    res.status(400).json(errorResponse);
    return;
  }

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = error.stack;
  }

  // Default
  res.status(500).json(errorResponse);
};
