import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { IGroupRouter } from '../helps/interfaces';
import { validationError } from '../middleware/validation.middleware.ts';
import GroupController from './group.controller';
import GroupParamsValidation from './middleware/group-validation.middleware.ts';

class GroupRouter implements IGroupRouter {
  private router = Router();
  private readonly baseAuthUrl = '/group/';
  injecting(): Router {
    this.router.post(`${this.baseAuthUrl}create`, checkSchema(GroupParamsValidation.validationCreateGroupBody), validationError, GroupController.createGroup);
    this.router.get(`${this.baseAuthUrl}all`, checkSchema(GroupParamsValidation.validationPaginationQueryParams), validationError, GroupController.showAllGroups);
    this.router.get(`${this.baseAuthUrl}:id`, checkSchema(GroupParamsValidation.validationIdParams), validationError, GroupController.showGroupById);
    this.router.delete(`${this.baseAuthUrl}:id`, checkSchema(GroupParamsValidation.validationIdParams), validationError, GroupController.deleteGroupById);
    this.router.patch(`${this.baseAuthUrl}:id`, checkSchema(GroupParamsValidation.validationIdParams), checkSchema(GroupParamsValidation.validationUpdateGroupBody), validationError, GroupController.updateGroupById);
    this.router.post(`${this.baseAuthUrl}add-user`, checkSchema(GroupParamsValidation.validationUserIdGroupIdInBody), validationError, GroupController.addUserToGroup);
    this.router.post(`${this.baseAuthUrl}remove-user`, checkSchema(GroupParamsValidation.validationUserIdGroupIdInBody), validationError, GroupController.removeUserFromGroup);
    return this.router;
  }
}

export const groupModule = new GroupRouter();