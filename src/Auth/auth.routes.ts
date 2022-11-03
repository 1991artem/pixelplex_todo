import { Router } from 'express';
import { IAuthRouter } from '../helps/interfaces';
import AuthController from './auth.controller';
import { validateError } from '../middleware/validate-payload.middleware.ts';
import AuthValidate from './authValidate';

class AuthRouter implements IAuthRouter {
  private router = Router();
  private readonly baseAuthUrl = '/auth/';
  injecting(): Router {
    this.router.post(`${this.baseAuthUrl}signin`, AuthValidate.validateSigninBody, validateError, AuthController.signUpPOST);
    this.router.post(`${this.baseAuthUrl}login`, AuthValidate.validateLoginBody, validateError, AuthController.loginPOST);
    return this.router;
  }
}

export const authModule = new AuthRouter();

