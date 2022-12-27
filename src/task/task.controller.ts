import { Response, NextFunction } from 'express';
import { STATUS_CODE } from '@constants';
import { AppError } from '@errors';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';
import { CreateTaskRequest, DeleteTaskRequest, GetAllTaskRequest, UpdateTaskRequest } from './types/request.types';
import { GetAllTaskResponse } from './types/task-types';

export default class TaskController {
  static async createTask( req: CreateTaskRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new AppError(STATUS_CODE.BAD_REQUEST, 'Invalid id');
      }
      const task: Task = await TaskService.createTask(req.body, req.user.id);
      res.status(201).json( {
        id: task.id,
        message: 'Task has been created',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllTasks( req: GetAllTaskRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?.id) {
        throw new AppError(STATUS_CODE.BAD_REQUEST, 'Invalid id');
      }
      const allTaskResponse: GetAllTaskResponse | undefined = await TaskService.getAllTasks(req.query, req.user.id);
      res.status(200).json(allTaskResponse);
    } catch (error) {
      next(error);
    }
  }
  static async deleteTaskById( req: UpdateTaskRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await TaskService.deleteTaskById(req.params.id);
      res.status(200).json({ message: 'Task has been deleted' });
    } catch (error) {
      next(error);
    }
  }
  static async updateTaskById( req: DeleteTaskRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskInfo: Partial<Task> = await TaskService.updateTaskById(req.params.id, req.body);
      res.status(200).json({ message: 'Task has been updated', group: taskInfo });
    } catch (error) {
      next(error);
    }
  }
}
