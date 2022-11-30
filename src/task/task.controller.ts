import { Request, Response, NextFunction } from 'express';
import { TaskDTO } from './dtos/task.dto';

export default class TaskController {
  static async createTask( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskDTO: TaskDTO = {
        name: req.body?.name,
        description: req.body?.description,
        status: req.body?.status,
        deadline: req.body?.deadline,
        priority: req.body?.priority,
      };
      res.status(201).json(taskDTO);
    } catch (error) {
      next(error);
    }
  }
  static async getAllTasks( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = req.query;
      res.status(200).json(queryParams);
    } catch (error) {
      next(error);
    }
  }
  static async getTaskById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params?.id;
      res.status(200).json(taskId);
    } catch (error) {
      next(error);
    }
  }
  static async deleteTaskById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params?.id;
      res.status(200).json(taskId);
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
      res.status(200).json({ taskId, updateBody });
    } catch (error) {
      next(error);
    }
  }
}
