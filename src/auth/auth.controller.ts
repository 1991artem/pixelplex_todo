import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '../user/dtos/user.dto';

export default class AuthController {
  static async signUpPOST( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userDTO: UserDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      res.status(201).json(userDTO);
    } catch (error) {
      next(error);
    }
  }

  static async loginPOST(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userDTO: UserDTO = {
        email: req.body.email,
        password: req.body.password,
      };
      res.status(200).json(userDTO);
    } catch (error) {
      next(error);
    }
  }
}
