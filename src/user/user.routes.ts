import { Application, Router } from 'express';
import { isAuth } from 'middleware/is-auth';
import { validatePayload } from '../middleware/validate-payload.middleware';
import * as validation from './user.validation';
import UserController from './user.controller';

const router = Router();
router.get('/:id/statistics', isAuth, validation.idParams, validatePayload, UserController.getUserStatistics);

export function mountRouter(app: Application): void {
  app.use('/api/v1/user', router);
}
