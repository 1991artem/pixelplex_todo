import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { IGroupRouter } from '../helps/interfaces';
import { validationError } from '../middleware/validation.middleware.ts';
import GroupController from './group.controller';
import GroupValidation from './middleware/group-validation.middleware.ts';

class GroupRouter implements IGroupRouter {
  private router = Router();
  private readonly baseAuthUrl = '/group/';
  injecting(): Router {
    this.router.post(`${this.baseAuthUrl}create`, checkSchema(GroupValidation.validationCreateGroupBody), validationError, GroupController.createGroup);
    this.router.get(`${this.baseAuthUrl}all`, checkSchema(GroupValidation.validationPaginationQueryParams), validationError, GroupController.showAllGroups);
    this.router.get(`${this.baseAuthUrl}:id`, checkSchema(GroupValidation.validationIdParams), validationError, GroupController.showGroupById);
    this.router.delete(`${this.baseAuthUrl}:id`, checkSchema(GroupValidation.validationIdParams), validationError, GroupController.deleteGroupById);
    this.router.patch(`${this.baseAuthUrl}:id`, checkSchema(GroupValidation.validationIdParams), validationError, GroupController.updateGroupById);
    this.router.post(`${this.baseAuthUrl}add-user`, checkSchema(GroupValidation.validationUserIdGroupIdInBody), validationError, GroupController.addUserToGroup);
    this.router.post(`${this.baseAuthUrl}remove-user`, checkSchema(GroupValidation.validationUserIdGroupIdInBody), validationError, GroupController.removeUserFromGroup);
    return this.router;
  }
}

export const groupModule = new GroupRouter();