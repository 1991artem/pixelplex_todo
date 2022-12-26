import { Request, Response, NextFunction } from 'express';
import { User, UserCreateDTO } from '@user';
import { STATUS_CODE } from '../constants';
import { authService } from './auth.service';
import { UserAuthDTO } from './dtos/auth.dtos';

export default class AuthController {
  static async signUp(req: Request<any, UserCreateDTO>, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: User = await authService.createUser(req.body);
      res.status(STATUS_CODE.OK).json({ id: user?.id, message: 'User has been created' });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request<any, UserAuthDTO>, res: Response, next: NextFunction): Promise<void> {
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
      });;
    } catch (error) {
      next(error);
    }
  }
}
