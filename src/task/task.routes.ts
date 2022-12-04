import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import * as paramsValidation from '../validators/params.validator';
import * as validation from '../validators/task.validation.ts';
import TaskController from './task.controller';

const router = Router();
router.post('/create', validation.createTask, validatePayload, TaskController.createTask);
router.get('/all', paramsValidation.paginationParams, validatePayload, TaskController.getAllTasks);
router.get('/:id', paramsValidation.idParams, validatePayload, TaskController.getTaskById);
router.delete('/:id', paramsValidation.idParams, validatePayload, TaskController.deleteTaskById);
router.patch('/:id', paramsValidation.idParams, validation.updateTaskById, validatePayload, TaskController.updateTaskById);

export function mountRouter(app: Application): void {
  app.use('/api/v1/task', router);
}
