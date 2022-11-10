import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { ITaskRouter } from '../helps/interfaces';
import { validationError } from '../middleware/validation.middleware.ts';
import TaskParamsValidation from './middleware/task-validation.middleware.ts';
import TaskController from './task.controller';

class TaskRouter implements ITaskRouter {
  private router = Router();
  private readonly baseAuthUrl = '/task/';
  injecting(): Router {
    this.router.post(`${this.baseAuthUrl}create`, checkSchema(TaskParamsValidation.validationTaskDTO), validationError, TaskController.createTask);
    this.router.get(`${this.baseAuthUrl}all`, checkSchema(TaskParamsValidation.validationPaginationQueryParams), validationError, TaskController.showAllTasks);
    this.router.get(`${this.baseAuthUrl}:id`, checkSchema(TaskParamsValidation.validationTaskParamsId), validationError, TaskController.showTaskById);
    this.router.delete(`${this.baseAuthUrl}:id`, checkSchema(TaskParamsValidation.validationTaskParamsId), validationError, TaskController.deleteTaskById);
    this.router.patch(`${this.baseAuthUrl}:id`, checkSchema(TaskParamsValidation.validationTaskParamsId), checkSchema(TaskParamsValidation.validationUpdateTaskBody), validationError, TaskController.updateTaskById);
    return this.router;
  }
}

export const taskModule = new TaskRouter();