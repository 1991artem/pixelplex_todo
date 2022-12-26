import { Response, NextFunction } from 'express';
import { Group } from './entity/group.entity';
import { GroupService } from './group.service';
import { IGetAllGroupResponse, CreateGroupRequest, RequestWithParamsId, GetAllRequest, UpdateGroupRequest, UserInGroupRequest } from './types/group-interfaces';

export default class GroupController {
  static async createGroup( req: CreateGroupRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const group: Group = await GroupService.createGroup(req.body);
      res.status(201).json({
        id: group.id,
        message: 'Group has been created',
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllGroups( req: GetAllRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const allGroupResponse: IGetAllGroupResponse = await GroupService.getAllGroups(req.query);
      res.status(200).json(allGroupResponse);
    } catch (error) {
      next(error);
    }
  }
  static async getGroupById( req: RequestWithParamsId, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupByIdRes = await GroupService.getGroupById(req.params?.id);
      res.status(200).json(groupByIdRes);
    } catch (error) {
      next(error);
    }
  }
  static async deleteGroupById( req: RequestWithParamsId, res: Response, next: NextFunction): Promise<void> {
    try {
      await GroupService.deleteGroupById(req.params?.id);
      res.status(200).json({ message: 'Group has been deleted' });
    } catch (error) {
      next(error);
    }
  }
  static async updateGroupById( req: UpdateGroupRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const groupInfo: Partial<Group> = await GroupService.updateGroupById(req.params?.id, req.body);
      res.status(200).json({ message: 'Group has been updated', group: groupInfo });
    } catch (error) {
      next(error);
    }
  }
  static async addUserToGroup( req: UserInGroupRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await GroupService.addUserToGroup(req.body);
      res.status(200).json( { message: 'The user has been added to the group' } );
    } catch (error) {
      next(error);
    }
  }
  static async removeUserFromGroup( req: UserInGroupRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await GroupService.removeUserFromGroup(req.body);
      res.status(200).json( { message: 'The user has been removed from the group' } );
    } catch (error) {
      next(error);
    }
  }
}
