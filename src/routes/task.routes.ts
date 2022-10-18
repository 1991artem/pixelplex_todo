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

export default class TaskApi {
  private router = Router();
  taskRouter():Router {
    this.addTask();
    // this.showTasks();
    this.showTaskById();
    this.deleteTaskById();
    this.updateTaskById();
    this.showTaskByGroupId();
    return this.router;
  }
  addTask():void {
    //endpoint ===> /api/task/add
    this.router.post(
      '/task/add',
      autorization,
      [
        check('name', 'Name is empty').notEmpty(), // validation task name
      ],
      async (req: Request, res: Response) => {
        try {
          const errors = validationResult(req); // check register tamplated validation
          if (!errors.isEmpty()) {
            return serverMessage(res, 400, { message: 'Incorrect data' });
          }
          const now: number = Date.now();
          const defaultDeadline: number = now + Number(config.get('defaultTime')) ? Number(config.get('defaultTime')) : 0; // add 1h to create task time
          const { name, description, status = 'to do', deadline = defaultDeadline, priority = 'high' } = req.body;
          if (deadline <= Date.now()) {
            serverMessage(res, 400, { message: 'Wrong deadline time' });
          }
          const isMatch: ITask = await Task.findOne({ name }) as ITask; // check task in DB
          if (isMatch) {
            serverMessage(res, 400, { message: 'This task already exists' });
          }
          const userId: string = getIdByHeaderToken(res, req) as string;
          const task: ITask = new Task({ name, description, status, deadline, priority, owner: userId }); // create new task
          await task.save();
          serverMessage(res, 201, { message: 'Task created' });

        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' + e });
        }
      });
  }
  // showTasks():void {
  //   //endpoint ===> /api/tasks
  //   this.router.get(
  //     '/tasks',
  //     autorization,
  //     async (req: Request, res: Response) => {
  //       try {
  //         const query: IQueryParams = req.query;
  //         const pagination: IPaginationsParams = getPaginationsParams(query, res) as IPaginationsParams;
  //         const sort = {
  //           [Object.keys(query)[0]]: Object.values(query)[0],
  //         };
  //         const tasks: ITask[] = await Task.find().limit(pagination.limit).skip(pagination.skip)
  //           .sort(sort) as ITask[];
  //         res.json(tasks);
  //       } catch (e) {
  //         serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
  //       }
  //     });
  // }
  showTaskById():void {
    //endpoint ===> /api/task/delete/:id
    this.router.get(
      '/task/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const task: ITask = await Task.findById(req.params?.id) as ITask;
          res.json(task);
        } catch (e) {
          serverMessage(res, 500, { message: 'Uuppss :( Something went wrong, please try again' });
        }
      });
  }
  showTaskByGroupId():void {
    //endpoint ===> /api/task/group
    this.router.get(
      '/tasks/group/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const group: string = req.params?.id;
          const query: IQueryParams = req.query;
          const userId: string = getIdByHeaderToken(res, req) as string;
          const client: IUser = await User.findOne({ _id: userId }, { groups: {
            $elemMatch: {
              $eq: group,
            },
          },
          }) as IUser;
          const isAdmin: boolean = client?.admin;
          if (!client && !isAdmin) {
            serverMessage(res, 403, { message: 'You do not have permission for this operation' });
            return;
          }
          const pagination: IPaginationsParams = getPaginationsParams(query, res) as IPaginationsParams;
          const user: IUser[] = await User.find({
            groups: {
              $elemMatch: {
                $eq: group,
              },
            },
          }) as IUser[];
          const idArray: string[] = [];
          for (const element in user) {
            idArray.push(user[element]._id?.toString() as string);
          }
          const sort = {
            [Object.keys(query)[0]]: Object.values(query)[0],
          };

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
    //endpoint ===> /api/task/delete/:id
    this.router.delete(
      '/task/delete/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const userId: string = getIdByHeaderToken(res, req) as string;
          const user: IUser = await User.findById(userId) as IUser;
          const task: ITask = await Task.findById(req.params?.id) as ITask;
          if (userId === task.owner.toString() || user.admin) {
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
    //endpoint ===> /api/task/edit/:id
    this.router.put(
      '/task/edit/:id',
      autorization,
      async (req: Request, res: Response) => {
        try {
          const userId: string = getIdByHeaderToken(res, req) as string;
          const user: IUser = await User.findById(userId) as IUser;
          const task: ITask = await Task.findById(req.params?.id) as ITask;
          if (userId === task.owner.toString() || user.admin) {
            const { name, description, deadline, status, priority } = req.body;
            const updateParams = {
              name,
              description,
              deadline,
              status: deadline < Date.now() ? undefined : status,
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
}
