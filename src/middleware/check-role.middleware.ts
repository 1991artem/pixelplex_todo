/* eslint-disable no-console */
import { NextFunction, Response } from 'express';
import { AppError } from 'errors/app.error';
import { STATUS_CODE } from 'types/enums';
import { AuthRequest } from 'types/express';
import { IUserAuthInfoInRequest } from 'types/types';

export function checkRole(userRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>> => {
    try {
      if (req.method === 'OPTIONS') {
        next();
      }
      const userInfo: IUserAuthInfoInRequest | undefined = req.user;
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
