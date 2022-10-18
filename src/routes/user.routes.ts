import { Router, Response, Request } from 'express';
import { User } from '../models/user';
import { Group } from '../models/groups';
import { Task } from '../models/task';
import { IGroup, IPaginationsParams, IQueryParams, IUser, IUserApi } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';
import { serverMessage } from '../helps/errorHandler';
import getPaginationsParams from '../helps/getPaginationsParams';
import getSortParams from '../helps/getSortParams';

export default class UserApi implements IUserApi {
  private router = Router();
  userRouter():Router {
    this.showUsers();
    this.showUserById();
    this.addToGroup();
    this.removeGroupFromUser();
    this.deleteUserById();
    return this.router;
  }
  showUsers():void {
    //endpoint ===> /api/users
    this.router.get(
      '/users',
      autorization,
      async (res: Response) => {
        try {
          const users: IUser[] = await User.find() as IUser[];
          res.json(users);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  showUserById():void {
    //endpoint ===> /api/user/:id
    this.router.get(
      '/user/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const query: IQueryParams = req.query;
          const pagination: IPaginationsParams = getPaginationsParams(query, res) as IPaginationsParams;
          const sort = query ? getSortParams(query) : {};
          const user: IUser = await User.findById(req.params?.id).limit(pagination.limit).skip(pagination.skip).sort(sort) as IUser;
          res.json(user);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  addToGroup():void {
    //endpoint ===> /api/user/group-add
    this.router.put(
      '/user/group-add/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const group_id: string = req.params?.id;
          const isMatch: IGroup = await Group.findById(group_id) as IGroup; // check group in DB
          if (!isMatch) {
            serverMessage(res, 400, { message: 'This name is not in the DB' });
          }
          const userId: string = getIdByHeaderToken(res, req) as string;
          const user: IUser = await User.findById(userId) as IUser;
          const isInGroupsArray = user.groups.some((group) => group.toString() === group_id);
          if (isInGroupsArray) {
            serverMessage(res, 400, { message: 'This user includes the group' });
            return;
          }
          if (!user.admin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          await user.updateOne({
            $push: {
              groups: group_id,
            },
          });
          await user.save();
          serverMessage(res, 201, { message: 'User add to group' });
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  removeGroupFromUser():void {
    //endpoint ===> /api/user/group-add
    this.router.put(
      '/user/group-remove/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const group_id = req.params?.id;
          const group: IGroup = await Group.findById(group_id) as IGroup; // check group in DB
          if (!group) {
            serverMessage(res, 400, { message: 'This name is not in the DB' });
            return;
          }
          const userId: string = getIdByHeaderToken(res, req) as string;
          const user: IUser = await User.findById(userId) as IUser; // check user in DB
          if (user.admin) {
            await user.updateOne({
              $pull: {
                groups: group_id,
              },
            });
            await user.save();
          } else {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
          }
          serverMessage(res, 201, { message: 'User removed from group' });
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  deleteUserById():void {
    //endpoint ===> /api/user/delete/:id
    this.router.delete(
      '/user/delete/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const deletedId = req.params.id;
          const userId: string = getIdByHeaderToken(res, req) as string;
          const admin: IUser = await User.findById(userId) as IUser;
          if (!admin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          const user: IUser = await User.findById(deletedId) as IUser;
          if (!user) {
            serverMessage(res, 400, { message: 'User not faund' });
            return;
          }
          await Task.deleteMany({ owher: deletedId });
          await user.delete();
          serverMessage(res, 200, { message: 'User deleted' });
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
}
