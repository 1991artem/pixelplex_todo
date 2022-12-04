import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import * as paramsValidation from '../validators/params.validator';
import * as validation from '../validators/group.validation.ts';
import GroupController from './group.controller';

const router = Router();
router.post('/create', validation.createGroup, validatePayload, GroupController.createGroup);
router.get('/all', paramsValidation.paginationParams, validatePayload, GroupController.getAllGroups);
router.get('/:id', paramsValidation.idParams, validatePayload, GroupController.getGroupById);
router.delete('/:id', paramsValidation.idParams, validatePayload, GroupController.deleteGroupById);
router.patch('/:id', paramsValidation.idParams, validation.updateGroupById, validatePayload, GroupController.updateGroupById);
router.post('/add-user', validation.userInGroup, validatePayload, GroupController.addUserToGroup);
router.post('/remove-user', validation.userInGroup, validatePayload, GroupController.removeUserFromGroup);

export function mountRouter(app: Application): void {
  app.use('/api/v1/group', router);
}
