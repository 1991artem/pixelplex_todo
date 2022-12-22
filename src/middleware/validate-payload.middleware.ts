import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validatePayload = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Bad request', statusCode: 400, errors: errors.array() });
  }
  next();
};
