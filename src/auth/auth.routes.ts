import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import AuthController from './auth.controller';
import * as validation from './validator/auth-validation.ts';

const router = Router();

router.post('/signup', validation.signUpPOST, validatePayload, AuthController.signUpPOST);
router.post('/login', validation.loginPOST, validatePayload, AuthController.loginPOST);

export function mountRouter(app: Application): void {
  app.use('/api/v1/auth', router);
}
