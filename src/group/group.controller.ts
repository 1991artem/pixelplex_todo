import { Request, Response, NextFunction } from 'express';
import { GroupDTO } from '../helps/interfaces';

export default class GroupController {
  static async createGroup( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupDTO: GroupDTO = {
        name: req.body?.name,
        description: req.body?.description,
      }
      res.status(201).json({ id: 0, message: `Group has been created`, group: groupDTO });
    } catch (error) {
      next(error);
    }
  }
  static async showAllGroups( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams = req.query;
      res.status(200).json({params: queryParams});
    } catch (error) {
      next(error);
    }
  }
  static async showGroupById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupId = req.params?.id;
      res.status(200).json({ id: groupId, message: `Show Group #${groupId}` });
    } catch (error) {
      next(error);
    }
  }
  static async deleteGroupById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupId = req.params?.id;
      res.status(200).json({ id: groupId, message: `Delete Group #${groupId}` });
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
      }
      res.status(200).json({ id: groupId, body: updateBody });
    } catch (error) {
      next(error);
    }
  }
  static async addUserToGroup( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const addParams = {
        userId: Number(req.body?.userId),
        groupId: Number(req.body?.groupId),
      }
      res.status(200).json({ message: addParams });
    } catch (error) {
      next(error);
    }
  }
  static async removeUserFromGroup( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const removeParams = {
        userId: Number(req.body?.userId),
        groupId: Number(req.body?.groupId),
      }
      res.status(200).json({ body: removeParams });
    } catch (error) {
      next(error);
    }
  }
}