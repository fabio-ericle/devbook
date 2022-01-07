import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/error/AppError';

export function globalErrors(err: Error, request: Request, response: Response, next: NextFunction) {
   if (err instanceof AppError) {
      return response.status(err.statusCode).json({
         status: 'error',
         error: err.message,
         data: err?.data,
      }).end();
   }
   return response.status(500).json({
      status: "error",
      message: "Internal Server Error!",
   }).end();
}