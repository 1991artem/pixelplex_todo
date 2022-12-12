import { Request, Response, NextFunction } from 'express';
import { Group } from './entity/group.entity';
import { GroupService } from './group.service';
import { GreateGroupDTO } from './dtos/group.dtos';
import { IGetAllGroupResponse, QueryPaginationType } from './types/group-interfaces';

export default class GroupController {
  static async createGroup( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupDTO: GreateGroupDTO = {
        name: req.body?.name,
        description: req.body?.description,
      };
      const group: Group = await GroupService.createGroup(groupDTO);
      res.status(201).json({
        id: group.id,
        message: 'Group has been created',
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllGroups( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const queryParams: Partial<QueryPaginationType> = req.query;
      const allGroupResponse: IGetAllGroupResponse = await GroupService.getAllGroups(queryParams);
      res.status(200).json(allGroupResponse);
    } catch (error) {
      next(error);
    }
  }
  static async getGroupById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupId = req.params?.id;
      const groupByIdRes = await GroupService.getGroupById(groupId);
      res.status(200).json(groupByIdRes);
    } catch (error) {
      next(error);
    }
  }
  static async deleteGroupById( req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupId = req.params?.id;
      await GroupService.deleteGroupById(groupId);
      res.status(200).json({ message: 'Group has been deleted' });
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
      const groupInfo: Partial<Group> = await GroupService.updateGroupById(groupId, updateBody);
      res.status(200).json({ message: 'Group has been updated', group: groupInfo });
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
      await GroupService.addUserToGroup(addParams);
      res.status(200).json( { message: 'The user has been added to the group' } );
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
      await GroupService.removeUserFromGroup(removeParams);
      res.status(200).json( { message: 'The user has been removed from the group' } );
    } catch (error) {
      next(error);
    }
  }
}
