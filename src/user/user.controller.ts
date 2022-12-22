import { Request, Response, NextFunction } from 'express';

export default class UserController {
  static async getUserStatistics( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params?.id;
      res.status(200).json(userId);
    } catch (error) {
      next(error);
    }
  }
}
