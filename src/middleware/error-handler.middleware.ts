/* eslint-disable no-console */
import { Response, Request, NextFunction } from 'express';
import { isApiError } from '../errors/app.error';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (isApiError(error)) {
    const { message, statusCode } = error;
    res.status(statusCode).json({ message, statusCode });
    return;
  }
  console.error(error);
  res.status(500).json({ message: 'Server error', statusCode: 500 });
};

export default errorHandler;
