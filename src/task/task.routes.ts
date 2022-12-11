import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware';
import * as validation from './task.validation';
import TaskController from './task.controller';

const router = Router();
router.post('/create', validation.createTask, validatePayload, TaskController.createTask);
router.get('/all', validation.getAllTasks, validatePayload, TaskController.getAllTasks);
router.get('/:id', validation.getTaskById, validatePayload, TaskController.getTaskById);
router.delete('/:id', validation.deleteTaskById, validatePayload, TaskController.deleteTaskById);
router.patch('/:id', validation.updateTaskById, validatePayload, TaskController.updateTaskById);

export function mountRouter(app: Application): void {
  app.use('/api/v1/task', router);
}
