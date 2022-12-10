import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from 'types/express';
import { STATUS_CODE } from '../types/enums';
import { User } from '../user/entity/user.entity';
import { AppError } from '../errors/app.error';
import { UserCreateDTO } from '../user/dtos/user.dtos';
import { authService } from './auth.service';
import { UserAuthDTO } from './dtos/auth.dtos';

export default class AuthController {
  static async signUp( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userCreateDTO: UserCreateDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      const user: User = await authService.userCreate(userCreateDTO);
      if (user?.id) {
        res.status(STATUS_CODE.OK).json({ id: user?.id, message: 'User has been created' });
      } else {
        throw new AppError(STATUS_CODE.INTERNAL_SERVER_ERROR, 'Server Error');
      }
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userAuthDTO: UserAuthDTO = {
        email: req.body.email,
        password: req.body.password,
      };
      const token: string | void = await authService.userLogin(userAuthDTO);
      if (token) {
        res.status(STATUS_CODE.OK).cookie('token', token, { maxAge: Number(process.env.COOKIE_LIFETIME) | 0 }).json({
          token,
        });
      } else {
        throw new AppError(STATUS_CODE.BAD_REQUEST, 'Token is invalid');
      }
    } catch (error) {
      next(error);
    }
  }

  static logout(req: AuthRequest, res: Response, next: NextFunction): void {
    try {
      req.headers.authorization?.replace('Bearer ', '');
      res.status(STATUS_CODE.OK).clearCookie('token').json({
        message: 'User logged out',
      });;
    } catch (error) {
      next(error);
    }
  }
}
