import { Router, Response, Request } from 'express';
import config from 'config';
import { check, validationResult } from 'express-validator';
import { Task } from '../models/task';
import { User } from '../models/user';
import { ITask, IQueryParams, IUser, IPaginationsParams } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';
import { serverMessage } from '../helps/errorHandler';
import getPaginationsParams from '../helps/getPaginationsParams';
import getSortParams from '../helps/getSortParams';

export default class TaskApi {
  private router = Router();
  taskRouter():Router {
    this.addTask();
    this.showTaskById();
    this.deleteTaskById();
    this.updateTaskById();
    this.showTaskByGroupId();
    return this.router;
  }
  addTask():void {
    //endpoint ===> /api/task/
    this.router.post(
      '/task/',
      autorization,
      [
        check('name', 'Name is empty').notEmpty(), // validation task name
      ],
      async (req: Request, res: Response) => {
        try {
          const errors = validationResult(req); // check register tamplated validation
          if (!errors.isEmpty()) {
            serverMessage(res, 400, { errors: errors.array(), message: 'Incorrect data' });
            return;
          }
          const now: number = Date.now();
          const defaultDeadline: number = now + Number(config.get('defaultTime')); // add 1h to create task time
          const { name, description, status = 'to do', deadline = new Date(defaultDeadline), priority = 'high' } = req.body;
          if (deadline <= Date.now()) {
            serverMessage(res, 400, { message: 'Wrong deadline time' });
            return;
          }
          const find_task: ITask | null = await Task.findOne({ name }); // check task in DB
          if (find_task) {
            serverMessage(res, 400, { message: 'This task already exists' });
            return;
          }
          const userId: string = getIdByHeaderToken(res, req) as string;
          const task: ITask = new Task({ name, description, status, deadline, priority, owner: userId }); // create new task
          await task.save();
          const emails = await this.callUsers(userId);
          res.json(emails);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' + e });
        }
      });
  }
  showTaskById():void {
    //endpoint ===> /api/task/:id
    this.router.get(
      '/task/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const task: ITask | null = await Task.findById(req.params?.id);
          if (!task) {
            serverMessage(res, 404, { message: 'Task not found' });
            return;
          }
          res.json(task);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  showTaskByGroupId():void {
    //endpoint ===> /api/task/group/:id
    this.router.get(
      '/tasks/group/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const group: string = req.params?.id;
          const query: IQueryParams = req.query;
          const userId: string = getIdByHeaderToken(res, req) as string;
          const user: IUser | null = await User.findOne({ _id: userId }, { groups: {
            $elemMatch: {
              $eq: group,
            },
          },
          }) as IUser;
          const isAdmin: boolean = user?.admin;
          if (!user && !isAdmin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          const pagination: IPaginationsParams = getPaginationsParams(query, res) as IPaginationsParams;
          const users: IUser[] = await User.find({
            groups: {
              $elemMatch: {
                $eq: group,
              },
            },
          });
          const idArray: string[] = [];
          for (const element in users) {
            idArray.push(users[element]._id?.toString() as string);
          }
          const sort = query ? getSortParams(query) : {};
          const tasks: ITask[] = await Task.find({
            owner: {
              $in: idArray,
            },
          }).limit(pagination.limit)
            .skip(pagination.skip)
            .sort(sort) as ITask[];
          res.json(tasks);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  deleteTaskById():void {
    //endpoint ===> /api/task/:id
    this.router.delete(
      '/task/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const userId: string = getIdByHeaderToken(res, req);
          const user: IUser | null = await User.findById(userId);
          if (!user) {
            serverMessage(res, 404, { message: 'User not found' });
            return;
          }
          const task: ITask | null = await Task.findById(req.params?.id);
          if (!task) {
            serverMessage(res, 404, { message: 'Task not found' });
            return;
          }
          if (userId === task?.owner.toString()) {
            await task.delete();
            serverMessage(res, 200, { message: 'Task deleted' });
          } else {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
          }
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  updateTaskById():void {
    //endpoint ===> /api/task/:id
    this.router.patch(
      '/task/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const userId: string = getIdByHeaderToken(res, req);
          const user: IUser | null = await User.findById(userId);
          if (!user) {
            serverMessage(res, 404, { message: 'User not found' });
            return;
          }
          const task: ITask | null= await Task.findById(req.params?.id);
          if (!task) {
            serverMessage(res, 404, { message: 'Task not found' });
            return;
          }
          if (userId === task.owner.toString()) {
            const { name, description, deadline, status, priority } = req.body;
            const updateParams = {
              name,
              description,
              deadline,
              status: deadline < Date.now() ? undefined : status,
              done: (deadline > Date.now())&&(status === 'done') ? Date.now() : undefined,
              priority,
            };
            await task.updateOne( updateParams);
            await task.save();
            serverMessage(res, 200, { message: 'Task update' });
          } else {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
          }
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  async callUsers(id: string): Promise<string[]> {
    const user: IUser | null = await User.findById(id) as IUser;
    const users: IUser[] = await User.find({
      groups: {
        $in: user.groups,
      },
    }) as IUser[];

    return users.map((user: IUser) => user.email);
  }
}
