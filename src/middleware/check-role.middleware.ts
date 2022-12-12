/* eslint-disable no-console */
import { NextFunction, Response } from 'express';
import { AppError } from 'errors/app.error';
import { AuthRequest, IUserAuthInfoInRequest } from 'types/express';
import { STATUS_CODE } from '../constants';

export function checkRole(userRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>> => {
    try {
      if (req.method === 'OPTIONS') {
        next();
      }
      const userInfo: IUserAuthInfoInRequest | null | undefined = req.user;
      if (!userInfo) {
        return next(new AppError(STATUS_CODE.UNAUTHORIZED, 'Authorization is invalid'));
      }

      const { role } = userInfo;
      if (!role) {
        return next(new AppError(STATUS_CODE.UNAUTHORIZED, 'Authorization is invalid'));
      }
      const hasRole = userRoles.includes(role);

      if (!hasRole) {
        return res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'You don\'t have access' });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
