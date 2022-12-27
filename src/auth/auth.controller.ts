import { Request, Response, NextFunction } from 'express';
import { User } from '@user';
import { STATUS_CODE } from '../constants';
import { authService } from './auth.service';
import { SignUpRequest, LoginRequest } from './types/request.types';

export default class AuthController {
  static async signUp(req: SignUpRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await authService.createUser(req.body);
      res.status(STATUS_CODE.OK).json({ id: user.id, message: 'User has been created' });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: LoginRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = await authService.login(req.body);
      res.status(STATUS_CODE.OK).json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  static logout(_req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(STATUS_CODE.OK).json({
        message: 'User logged out',
      });
    } catch (error) {
      next(error);
    }
  }
}
