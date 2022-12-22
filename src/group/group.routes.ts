import { Application, Router } from 'express';
import { validatePayload } from '../middleware/validate-payload.middleware';
import * as validation from './group.validation';
import GroupController from './group.controller';

const router = Router();
router.post('/create', validation.createGroup, validatePayload, GroupController.createGroup);
router.get('/all', validation.getAllGroups, validatePayload, GroupController.getAllGroups);
router.get('/:id', validation.getGroupById, validatePayload, GroupController.getGroupById);
router.delete('/:id', validation.deleteGroupById, validatePayload, GroupController.deleteGroupById);
router.patch('/:id', validation.updateGroupById, validatePayload, GroupController.updateGroupById);
router.post('/add-user', validation.addUserToGroup, validatePayload, GroupController.addUserToGroup);
router.post('/remove-user', validation.removeUserFromGroup, validatePayload, GroupController.removeUserFromGroup);

export function mountRouter(app: Application): void {
  app.use('/api/v1/group', router);
}
