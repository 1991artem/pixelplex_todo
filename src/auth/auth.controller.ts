import { Request, Response, NextFunction } from 'express';
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
      const user: User | void = await authService.userCreate(userCreateDTO);
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
      const token: string = await authService.userLogin(userAuthDTO);
      res.status(STATUS_CODE.OK).json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
