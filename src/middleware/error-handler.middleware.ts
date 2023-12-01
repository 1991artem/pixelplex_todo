/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Response, Request, NextFunction } from 'express';
import { isAppError } from '../errors/app.error';

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (isAppError(error)) {
    const { message, statusCode } = error;
    res.status(statusCode).json({ message, statusCode });
    return;
  }
  console.error(error);
  res.status(500).json({ message: 'Server error', statusCode: 500 });
};
