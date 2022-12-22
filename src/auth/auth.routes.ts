import { Application, Router } from 'express';
import { validatePayload, isAuth } from '@middleware';
import * as validation from './auth.validation';
import AuthController from './auth.controller';

const router = Router();

router.post('/signup', validation.signUp, validatePayload, AuthController.signUp);
router.post('/login', validation.login, validatePayload, AuthController.login);
router.post('/logout', isAuth, AuthController.logout);

export function mountRouter(app: Application): void {
  app.use('/api/v1/auth', router);
}
