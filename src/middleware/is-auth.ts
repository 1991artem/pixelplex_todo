import { NextFunction, Response, Request } from 'express';

import * as jwt from 'jsonwebtoken';
import { IUserAuthInfoInRequest } from 'types/express';
import { AppError } from 'errors/app.error';
import { STATUS_CODE } from '../constants';

export function isAuth(req: Request, _res: Response, next: NextFunction): void {
  const jwt_secret_key: string | undefined = process.env.JWT_SECRET;
  try {
    if (req.method === 'OPTIONS') {
      next();
    }
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      throw new AppError(STATUS_CODE.BAD_REQUEST,'Authorization header is missing');
    }

    const [, token] = authHeader.split(' ');

    if (jwt_secret_key) {
      const verifiedToken: IUserAuthInfoInRequest = jwt.verify(token, jwt_secret_key) as jwt.JwtPayload & { token: string, role: string, userId: string };
      req.user = verifiedToken;
      next();
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError && error.message === 'invalid signature') {
      return next(new AppError(STATUS_CODE.UNAUTHORIZED, 'Invalid authorization token'));
    }
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError(STATUS_CODE.UNAUTHORIZED, 'Authorization token expired'));
    }
    next(error);
  }
}
