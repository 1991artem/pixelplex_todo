import { Response, NextFunction } from 'express';
import { GetStatisticsRequest } from './types/request.types';
import { UserService } from './user.service';

export default class UserController {
  static async getUserStatistics( req: GetStatisticsRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const statistics = await UserService.getUserStatistics(req.params.id);
      res.status(200).json(statistics);
    } catch (error) {
      next(error);
    }
  }
}
