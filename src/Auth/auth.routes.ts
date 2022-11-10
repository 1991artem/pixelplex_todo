import { Router } from 'express';
import { IAuthRouter } from '../helps/interfaces';
import AuthController from './auth.controller';
import { validationError } from '../middleware/validation.middleware.ts';
import AuthValidation from './middleware/auth-validation.middleware.ts';
import { checkSchema } from 'express-validator';

class AuthRouter implements IAuthRouter {
  private router = Router();
  private readonly baseAuthUrl = '/auth/';
  injecting(): Router {
    this.router.post(`${this.baseAuthUrl}signup`, checkSchema(AuthValidation.validateSignUpBody), validationError, AuthController.signUpPOST);
    this.router.post(`${this.baseAuthUrl}login`, checkSchema(AuthValidation.validateLoginBody), validationError, AuthController.loginPOST);
    return this.router;
  }
}

export const authModule = new AuthRouter();

