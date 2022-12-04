import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import * as validation from '../validators/auth.validation.ts';
import AuthController from './auth.controller';

const router = Router();

router.post('/signup', validation.signUp, validatePayload, AuthController.signUp);
router.post('/login', validation.login, validatePayload, AuthController.login);

export function mountRouter(app: Application): void {
  app.use('/api/v1/auth', router);
}