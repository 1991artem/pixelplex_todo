import { Application, Router } from 'express';
import { isAuth } from 'middleware/is-auth';
import { validatePayload } from '../middleware/validate-payload.middleware';
import * as validation from './task.validation';
import TaskController from './task.controller';

const router = Router();
router.post('/create', isAuth, validation.createTask, validatePayload, TaskController.createTask);
router.get('/all', isAuth, validation.paginationParams, validatePayload, TaskController.getAllTasks);
router.get('/:id', isAuth, validation.idParams, validatePayload, TaskController.getTaskById);
router.delete('/:id',isAuth, validation.idParams, validatePayload, TaskController.deleteTaskById);
router.patch('/:id', isAuth, validation.idParams, validation.updateTaskById, validatePayload, TaskController.updateTaskById);

export function mountRouter(app: Application): void {
  app.use('/api/v1/task', router);
}
