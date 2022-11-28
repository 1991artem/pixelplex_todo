import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import GroupController from './group.controller';
import GroupParamsValidation from './middleware/group-validation.middleware.ts';

const router = Router();
router.post(`/create`, GroupParamsValidation.validationCreateGroupBody, validatePayload, GroupController.createGroup);
router.get(`/all`, GroupParamsValidation.validationPaginationQueryParams, validatePayload, GroupController.getAllGroups);
router.get(`/:id`, GroupParamsValidation.validationIdParams, validatePayload, GroupController.getGroupById);
router.delete(`/:id`, GroupParamsValidation.validationIdParams, validatePayload, GroupController.deleteGroupById);
router.patch(`/:id`, GroupParamsValidation.validationIdParams, GroupParamsValidation.validationUpdateGroupBody, validatePayload, GroupController.updateGroupById);
router.post(`/add-user`, GroupParamsValidation.validationUserIdGroupIdInBody, validatePayload, GroupController.addUserToGroup);
router.post(`/remove-user`, GroupParamsValidation.validationUserIdGroupIdInBody, validatePayload, GroupController.removeUserFromGroup);

export function mountRouter(app: Application): void {
  app.use('/api/v1/group', router);
}
