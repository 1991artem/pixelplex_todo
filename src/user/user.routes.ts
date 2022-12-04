import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import * as validation from './user.validation';
import UserController from './user.controller';

const router = Router();
router.get('/:id/statistics', validation.idParams, validatePayload, UserController.getUserStatistics);

export function mountRouter(app: Application): void {
  app.use('/api/v1/user', router);
}
