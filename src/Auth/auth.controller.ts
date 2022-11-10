import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '../helps/interfaces';
import { authService } from './auth.service';

export default class AuthController {
  static async signUpPOST( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userDTO: UserDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
      const user = await authService.userCreate(userDTO);
      res.status(201).json({ id: user?.id, message: 'User has been created' });
    } catch (error) {
      next(error);
    }
  }

  static async loginPOST(req: Request, res: Response, next: NextFunction):  Promise<void> {
    try {
      const userDTO: UserDTO = {
        email: req.body.email,
        password: req.body.password,
      }
      const user = await authService.userLogin(userDTO);
      res.json({ token: authService.getJtwToken(`${user?.id}`, user?.role, user?.name)}); // request token to client
    } catch (error) {
      next(error);
    }
  }

}

