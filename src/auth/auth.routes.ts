import { Application, Router } from 'express';
import AuthController from './auth.controller';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import AuthParamsValidation from './middleware/auth-validation.middleware.ts';

const router = Router();

router.post(`/signup`, AuthParamsValidation.validateSignUpBody, validatePayload, AuthController.signUpPOST);
router.post(`/login`, AuthParamsValidation.validateLoginBody, validatePayload, AuthController.loginPOST);

export function mountRouter(app: Application): void {
  app.use('/api/v1/auth', router);
}
