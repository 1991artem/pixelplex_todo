import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '../helps/interfaces';

export default class AuthController {
  static async signUpPOST( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userDTO: UserDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }
      res.status(201).json({ body: userDTO });
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
      res.status(200).json({ body: userDTO });
    } catch (error) {
      next(error);
    }
  }

}

