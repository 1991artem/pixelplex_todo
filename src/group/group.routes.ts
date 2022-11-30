import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import * as mainValidation from '../validators/main-validator';
import GroupController from './group.controller';
import * as validation from './validator/group-validation.ts';

const router = Router();
router.post('/create', validation.createGroup, validatePayload, GroupController.createGroup);
router.get('/all', mainValidation.paginationParams, validatePayload, GroupController.getAllGroups);
router.get('/:id', mainValidation.idParams, validatePayload, GroupController.getGroupById);
router.delete('/:id', mainValidation.idParams, validatePayload, GroupController.deleteGroupById);
router.patch('/:id', mainValidation.idParams, validation.updateGroupById, validatePayload, GroupController.updateGroupById);
router.post('/add-user', validation.userInGroup, validatePayload, GroupController.addUserToGroup);
router.post('/remove-user', validation.userInGroup, validatePayload, GroupController.removeUserFromGroup);

export function mountRouter(app: Application): void {
  app.use('/api/v1/group', router);
}
