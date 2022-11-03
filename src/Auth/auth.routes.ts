import { Router } from 'express';
import { IAuthRouter } from '../helps/interfaces';
import AuthController from './auth.controller';
import Validate from '../validate/validate';

export default class AuthRouter implements IAuthRouter {
  private router = Router();
  private readonly baseAuthUrl = '/auth/';
  authRouter(): Router {
    this.router.post(`${this.baseAuthUrl}signin`, Validate.validateSigninBody, Validate.validateError, AuthController.signinController);
    this.router.post(`${this.baseAuthUrl}login`, Validate.validateLoginBody, Validate.validateError, AuthController.loginController);
    return this.router;
  }
}

