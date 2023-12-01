/* eslint-disable no-console */
import { NextFunction, Response, Request } from 'express';
import { IUserAuthInfoInRequest } from 'types/express';
import { STATUS_CODE } from '../constants';

export function checkRole(userRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>> => {
    try {
      if (req.method === 'OPTIONS') {
        next();
      }
      const { role } = req.user as IUserAuthInfoInRequest;
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
