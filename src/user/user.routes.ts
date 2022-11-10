import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { IUserRouter } from '../helps/interfaces';
import { validationError } from '../middleware/validation.middleware.ts';
import UserParamsValidation from './middleware/user-validation.middleware.ts';
import UserController from './user.controller';

class UserRouter implements IUserRouter {
  private router = Router();
  private readonly baseAuthUrl = '/user/';
  injecting(): Router {
    this.router.get(`${this.baseAuthUrl}:id/statistics`, checkSchema(UserParamsValidation.validationUserParamsId), validationError, UserController.getUserStatistics);
    return this.router;
  }
}

export const userModule = new UserRouter();