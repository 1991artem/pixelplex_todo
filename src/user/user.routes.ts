import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import UserParamsValidation from './middleware/user-validation.middleware.ts';
import UserController from './user.controller';

const router = Router();
router.get(`/:id/statistics`, UserParamsValidation.validationUserParamsId, validatePayload, UserController.getUserStatistics);

export function mountRouter(app: Application): void {
  app.use('/api/v1/user', router);
}
