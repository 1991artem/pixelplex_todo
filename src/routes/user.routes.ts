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
          const user: IUser | null = await User.findById(req.params?.id);
          if (!user) {
            serverMessage(res, 404, { message: 'User not found' });
            return;
          }
          res.json(user);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  addToGroup():void {
    //endpoint ===> /api/user/group-add/:id
    this.router.patch(
      '/user/group-add/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const group_id: string = req.params?.id;
          const group: IGroup | null = await Group.findById(group_id); // check group in DB
          if (!group) {
            serverMessage(res, 400, { message: 'This name is not in the DB' });
          }
          const userId: string = getIdByHeaderToken(res, req);
          const user: IUser | null = await User.findById(userId);
          if (!user) {
            serverMessage(res, 404, { message: 'User not found' });
            return;
          }
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
    //endpoint ===> /api/user/:user_id/remove/:group_id
    this.router.patch(
      '/user/:user_id/remove/:group_id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const group_id = req.params?.group_id;
          const user_id = req.params?.user_id;
          const userId: string = getIdByHeaderToken(res, req);
          const admin: IUser | null = await User.findById(userId); // check user in DB
          if (!admin) {
            serverMessage(res, 404, { message: 'User not found' });
            return;
          };
          if (admin?.admin) {
          await User.updateOne({ 
              _id: user_id
            },
            {
              $pull: {
              groups: group_id,
            },
          },
          ); 
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
    //endpoint ===> /api/user/:id
    this.router.delete(
      '/user/delete/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const deletedId = req.params.id;
          const userId: string = getIdByHeaderToken(res, req);
          const admin: IUser | null = await User.findById(userId);
          if (!admin) {
            serverMessage(res, 404, { message: 'User not found' });
            return;
          }
          if (!admin.admin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          const user: IUser | null = await User.findById(deletedId);
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
          const userId: string = getIdByHeaderToken(res, req);
          const isMatch: boolean = await User.find({
            $or: [
              { _id: id },
              { _id: userId },
            ],
          }).then((users: IUser[]) => {
            if (users.length === 2) {
              return users[0].groups.some((groupFirst) =>
                users[1].groups.some((groupSecond) =>
                  groupSecond.toString() === groupFirst.toString()));
            } else {
              return false;
            }
          });
          if (!isMatch) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation. You do not have shared groups' });
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
