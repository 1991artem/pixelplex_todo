import { Request, Response, NextFunction } from 'express';
import { CreateTaskDTO } from './dtos/task.dtos';
import { Task } from './entity/task.entity';
import TaskService from './task.service';
import { IGetAllTaskResponse } from './types/task-interfaces';
import { QueryType } from './types/task-types';

export default class TaskController {
  static async createTask( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskDTO: CreateTaskDTO = {
        name: req.body?.name,
        description: req.body?.description,
        status: req.body?.status,
        deadline: req.body?.deadline,
        priority: req.body?.priority,
      };
      const task: Task = await TaskService.createTask(taskDTO);
      res.status(201).json(  {
        id: task.id,
        message: 'Task has been created',
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllTasks( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams: Partial<QueryType> = req.query;
      const userId = req.user?.userId;
      const allTaskResponse: IGetAllTaskResponse | undefined = await TaskService.getAllTasks(queryParams, userId);
      res.status(200).json(allTaskResponse);
    } catch (error) {
      next(error);
    }
  }
  static async deleteTaskById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params?.id;
      await TaskService.deleteTaskById(taskId);
      res.status(200).json({ message: 'Task has been deleted' });
    } catch (error) {
      next(error);
    }
  }
  static async updateTaskById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params?.id;
      const updateBody = {
        name: req.body?.name,
        description: req.body?.description,
        status: req.body?.status,
        deadline: req.body?.deadline,
        priority: req.body?.priority,
      };
      const taskInfo: Partial<Task> = await TaskService.updateTaskById(taskId, updateBody);
      res.status(200).json({ message: 'Task has been updated', group: taskInfo });
    } catch (error) {
      next(error);
    }
  }
}
