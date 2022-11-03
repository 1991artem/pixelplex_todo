import { Request, Response, NextFunction } from 'express';
import { AuthParams } from '../helps/interfaces';
import { sign } from 'jsonwebtoken';
import config from 'config';
import { User } from '../models/UserSchema';
import { authService } from './auth.service';

export default class AuthController {
  static async signUpPOST( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authParams: AuthParams = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
      const user = await authService.userCreate(authParams);
      res.status(201).json({ id: user?.id, message: 'User has been created' });
    } catch (error) {
      next(error);
    }
  }

  static async loginPOST(req: Request, res: Response, next: NextFunction):  Promise<void> {
    try {
      const authParams: AuthParams = {
        email: req.body.email,
        password: req.body.password,
      }
      const user: User = await authService.userLogin(authParams);
      res.json({ token: AuthController.getJtwToken(`${user?.id}`, user?.role, user?.name)}); // request token to client
    } catch (error) {
      next(error);
    }
  }

  static getJtwToken(id: string, role: string, name: string): string {
    const tokenLifetime: string = config.get('tokenLifetime');
    if (!process.env.JWT_SECRET) {
      return '';
    };
    return sign(
      { id, role, name },
      process.env.JWT_SECRET,
      { expiresIn: tokenLifetime },
    );
  };

}

