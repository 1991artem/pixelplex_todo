import { Request, Response, NextFunction } from 'express';
import { GetUserStatisticsRequesr } from './types/user-interfaces';
import { UserService } from './user.service';

export default class UserController {
  static async getUserStatistics( req: Request<GetUserStatisticsRequesr, any>, res: Response, next: NextFunction): Promise<void> {
    try {
      const statistics = await UserService.getUserStatistics(req.params.id);
      res.status(200).json(statistics);
    } catch (error) {
      next(error);
    }
  }
}
