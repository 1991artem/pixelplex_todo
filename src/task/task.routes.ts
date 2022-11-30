import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import * as mainValidation from '../validators/main-validator';
import TaskController from './task.controller';
import * as validation from './validator/task-validation.ts';

const router = Router();
router.post('/create', validation.createTask, validatePayload, TaskController.createTask);
router.get('/all', mainValidation.paginationParams, validatePayload, TaskController.getAllTasks);
router.get('/:id', mainValidation.idParams, validatePayload, TaskController.getTaskById);
router.delete('/:id', mainValidation.idParams, validatePayload, TaskController.deleteTaskById);
router.patch('/:id', mainValidation.idParams, validation.updateTaskById, validatePayload, TaskController.updateTaskById);

export function mountRouter(app: Application): void {
  app.use('/api/v1/task', router);
}
