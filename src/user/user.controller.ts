import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

export default class UserController {
  static async getUserStatistics( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params?.id;
      const statistics = await UserService.getUserStatistics(userId)
      res.status(200).json(statistics);
    } catch (error) {
      next(error);
    }
  }
}
