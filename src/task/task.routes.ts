import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import * as validation from './task.validation';
import TaskController from './task.controller';

const router = Router();
router.post('/create', validation.createTask, validatePayload, TaskController.createTask);
router.get('/all', validation.paginationParams, validatePayload, TaskController.getAllTasks);
router.get('/:id', validation.idParams, validatePayload, TaskController.getTaskById);
router.delete('/:id', validation.idParams, validatePayload, TaskController.deleteTaskById);
router.patch('/:id', validation.idParams, validation.updateTaskById, validatePayload, TaskController.updateTaskById);

export function mountRouter(app: Application): void {
  app.use('/api/v1/task', router);
}
