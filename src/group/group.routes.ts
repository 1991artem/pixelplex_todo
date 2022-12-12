import { Application, Router } from 'express';
import { isAuth } from 'middleware/is-auth';
import { checkRole } from 'middleware/check-role.middleware';
import { validatePayload } from '../middleware/validate-payload.middleware';
import * as validation from './group.validation';
import GroupController from './group.controller';

const router = Router();
router.post('/create', isAuth, checkRole(['admin']), validation.createGroup, validatePayload, GroupController.createGroup);
router.get('/all', isAuth, checkRole(['admin']), validation.getAllGroups, validatePayload, GroupController.getAllGroups);
router.get('/:id', isAuth, checkRole(['admin']), validation.getGroupById, validatePayload, GroupController.getGroupById);
router.delete('/:id', isAuth, checkRole(['admin']), validation.deleteGroupById, validatePayload, GroupController.deleteGroupById);
router.patch('/:id', isAuth, checkRole(['admin']), validation.updateGroupById, validatePayload, GroupController.updateGroupById);
router.post('/add-user', isAuth, checkRole(['admin']), validation.addUserToGroup, validatePayload, GroupController.addUserToGroup);
router.post('/remove-user', isAuth, checkRole(['admin']), validation.removeUserFromGroup, validatePayload, GroupController.removeUserFromGroup);

export function mountRouter(app: Application): void {
  app.use('/api/v1/group', router);
}
