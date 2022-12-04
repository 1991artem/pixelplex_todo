import { Request, Response, NextFunction } from 'express';
import { QueryType } from '../types/types';

export default class GroupController {
  static async createGroup( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupDTO = {
        name: req.body?.name,
        description: req.body?.description,
      };
      res.status(201).json(groupDTO);
    } catch (error) {
      next(error);
    }
  }
  static async getAllGroups( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams: Partial<QueryType> = req.query;
      res.status(200).json(queryParams);
    } catch (error) {
      next(error);
    }
  }
  static async getGroupById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupId = req.params?.id;
      res.status(200).json(groupId);
    } catch (error) {
      next(error);
    }
  }
  static async deleteGroupById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupId = req.params?.id;
      res.status(200).json(groupId);
    } catch (error) {
      next(error);
    }
  }
  static async updateGroupById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupId = req.params?.id;
      const updateBody = {
        name: req.body?.name,
        description: req.body?.description,
      };
      res.status(200).json({ groupId, updateBody });
    } catch (error) {
      next(error);
    }
  }
  static async addUserToGroup( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const addParams = {
        userId: Number(req.body?.userId),
        groupId: Number(req.body?.groupId),
      };
      res.status(200).json(addParams);
    } catch (error) {
      next(error);
    }
  }
  static async removeUserFromGroup( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const removeParams = {
        userId: Number(req.body?.userId),
        groupId: Number(req.body?.groupId),
      };
      res.status(200).json(removeParams);
    } catch (error) {
      next(error);
    }
  }
}
