import { Application, Router } from 'express';
import { isAuth } from 'middleware/is-auth';
import { validatePayload } from '../middleware/validate-payload.middleware';
import * as validation from './group.validation';
import GroupController from './group.controller';

const router = Router();
router.post('/create', isAuth, validation.createGroup, validatePayload, GroupController.createGroup);
router.get('/all', isAuth, validation.paginationParams, validatePayload, GroupController.getAllGroups);
router.get('/:id', isAuth, validation.idParams, validatePayload, GroupController.getGroupById);
router.delete('/:id', isAuth, validation.idParams, validatePayload, GroupController.deleteGroupById);
router.patch('/:id', isAuth, validation.idParams, validation.updateGroupById, validatePayload, GroupController.updateGroupById);
router.post('/add-user', isAuth, validation.userInGroup, validatePayload, GroupController.addUserToGroup);
router.post('/remove-user', isAuth, validation.userInGroup, validatePayload, GroupController.removeUserFromGroup);

export function mountRouter(app: Application): void {
  app.use('/api/v1/group', router);
}
