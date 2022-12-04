import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware.ts';
import * as validation from './group.validation';
import GroupController from './group.controller';

const router = Router();
router.post('/create', validation.createGroup, validatePayload, GroupController.createGroup);
router.get('/all', validation.paginationParams, validatePayload, GroupController.getAllGroups);
router.get('/:id', validation.idParams, validatePayload, GroupController.getGroupById);
router.delete('/:id', validation.idParams, validatePayload, GroupController.deleteGroupById);
router.patch('/:id', validation.idParams, validation.updateGroupById, validatePayload, GroupController.updateGroupById);
router.post('/add-user', validation.userInGroup, validatePayload, GroupController.addUserToGroup);
router.post('/remove-user', validation.userInGroup, validatePayload, GroupController.removeUserFromGroup);

export function mountRouter(app: Application): void {
  app.use('/api/v1/group', router);
}
