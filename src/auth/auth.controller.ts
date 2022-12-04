import { Request, Response, NextFunction } from 'express';

export default class AuthController {
  static async signUp( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      res.status(201).json(userDTO);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userDTO = {
        email: req.body.email,
        password: req.body.password,
      };
      res.status(200).json(userDTO);
    } catch (error) {
      next(error);
    }
  }
}
