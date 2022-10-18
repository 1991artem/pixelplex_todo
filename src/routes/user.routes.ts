import { Router, Response, Request } from 'express';
import { User } from '../models/user';
import { Group } from '../models/groups';
import { Task } from '../models/task';
import { IGroup, ITask, IUser, IUserApi, Statistic } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';
import { serverMessage } from '../helps/errorHandler';

export default class UserApi implements IUserApi {
  private router = Router();
  userRouter():Router {
    this.showUsers();
    this.showUserById();
    this.addToGroup();
    this.removeGroupFromUser();
    this.deleteUserById();
    this.getUserStatisticByUserId();
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
          const user: IUser = await User.findById(req.params?.id) as IUser;
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
  getUserStatisticByUserId(): void {
    //endpoint ===> /api/statistic/user/:id
    this.router.get(
      '/statistic/user/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const id: string = req.params?.id;
          const findUser: IUser = await User.findById(id) as IUser;
          if (!findUser) {
            serverMessage(res, 400, { message: 'User not faund' });
            return;
          }
          const userId: string = getIdByHeaderToken(res, req) as string;
          const client: IUser = await User.findById(userId) as IUser;
          const isMatch = findUser.groups.filter((userGroup) => {
            return client.groups.some((clientGroup) => clientGroup.toString() === userGroup.toString());
          });
          if (!isMatch) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation. You do not match group' });
            return;
          }
          const statistic = await this.getUserStatistic(id);
          res.json(statistic);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  async getUserStatistic(userId: string): Promise<Statistic> {
    const result = {
      id: userId,
      todo: 0,
      in_progress: 0,
      done: 0,
      deadline_done: 0,
      deadline_skip: 0,
    };
    const tasks: ITask[] = await Task.find({
      owner: userId,
    });
    tasks.forEach((task: ITask) => {
      if (+task.deadline < +Date.now()) {
        task.done ? result.deadline_done++ : result.deadline_skip++;
      } else {
        switch (task.status.toLowerCase()) {
        case 'to do': result.todo++; break;
        case 'done': result.todo++; break;
        case 'progress': result.todo++; break;
        }
      }
    });
    return result;
  }
}
