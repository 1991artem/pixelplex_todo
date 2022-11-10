import { Request, Response, NextFunction } from 'express';
import { TaskDTO } from '../helps/interfaces';

export default class TaskController {
  static async createTask( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskDTO: TaskDTO = {
        name: req.body?.name,
        description: req.body?.description,
        status: req.body?.status,
        deadline: req.body?.deadline,
        priority: req.body?.priority,
      }
      res.status(201).json({task: taskDTO });
    } catch (error) {
      next(error);
    }
  }
  static async showAllTasks( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = req.query;
      res.status(200).json({ params: queryParams });
    } catch (error) {
      next(error);
    }
  }
  static async showTaskById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params?.id;
      res.status(200).json({ id: taskId, message: `Show Task #${taskId}` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteTaskById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const taskId = req.params?.id;
      res.status(200).json({ id: taskId, message: `Delete Group #${taskId}` });
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
      }
      res.status(200).json({ id: taskId, body: updateBody });
    } catch (error) {
      next(error);
    }
  }
}