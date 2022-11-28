import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import TaskParamsValidation from './middleware/task-validation.middleware.ts';
import TaskController from './task.controller';

const router = Router();
router.post(`/create`, TaskParamsValidation.validationTaskDTO, validatePayload, TaskController.createTask);
router.get(`/all`, TaskParamsValidation.validationPaginationQueryParams, validatePayload, TaskController.getAllTasks);
router.get(`/:id`, TaskParamsValidation.validationTaskParamsId, validatePayload, TaskController.getTaskById);
router.delete(`/:id`, TaskParamsValidation.validationTaskParamsId, validatePayload, TaskController.deleteTaskById);
router.patch(`/:id`, TaskParamsValidation.validationTaskParamsId, TaskParamsValidation.validationUpdateTaskBody, validatePayload, TaskController.updateTaskById);

export function mountRouter(app: Application): void {
  app.use('/api/v1/task', router);
}
