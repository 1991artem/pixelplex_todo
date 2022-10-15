import { Router, Response } from 'express';
import {Task} from '../models/task';
import {User} from '../models/user';
import { check, validationResult } from 'express-validator';
import { IGetUserAuthInfoRequest, ITask, IQueryParams, IUser } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken'
import { serverMessage } from '../helps/errorHandler';
import sortData from '../helps/dataSort';


export default class TaskApi {
  private router = Router();
  taskRouter(){
    this.addTask();
    this.showTask();
    this.showTaskById();
    this.deleteTaskById();
    this.updateTaskById();
    return this.router;
  }
  addTask(){
    //endpoint ===> /api/task/add
    this.router.post(
      '/task/add',
      autorization,
      [
        check('name', 'Name is empty').notEmpty()                // validation task name
      ],
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const errors = validationResult(req)          // check register tamplated validation

        if (!errors.isEmpty()) {
          return serverMessage(res, 400, {errors: errors.array(), message: 'Incorrect data'})
        }

        const {name, discription} = req.body;
        const isMatch: ITask = await Task.findOne({ name })           // check task in DB
        if (isMatch) {
          return serverMessage(res, 400, {message: 'This task already exists'})
        }
        const userId: string = getIdByHeaderToken(res, req) as string;
        const task = new Task({ name, discription,  owner: userId});       // create new task
        await task.save();
        serverMessage(res, 201, {message: 'Task created'});

      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again' + e});
      }
    })
  }
  showTask(){
    //endpoint ===> /api/tasks
    this.router.get(
      '/tasks',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const query: IQueryParams = req.query;
        const {skip = '0', limit = '10', page = '1'} = query;
        const pagination =  {
          skip: parseInt(skip)*parseInt(page),
          limit: parseInt(limit)*parseInt(page),
        }
        const task: ITask[] = await Task.find().skip(pagination.skip).limit(pagination.limit);
        const responseData = sortData(query, task)
        res.json(responseData)
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  showTaskById(){
    //endpoint ===> /api/task/delete/:id
    this.router.get(
      '/task/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const task: ITask = await Task.findById(req.params?.id)
        res.json(task)
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  deleteTaskById(){
    //endpoint ===> /api/task/delete/:id
    this.router.delete(
      '/task/delete/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const userId: string = getIdByHeaderToken(res, req) as string;
        const user: IUser = await User.findById(userId);
        const task: ITask = await Task.findById(req.params?.id);
        if(userId === task.owner || user.admin){
          await Task.findByIdAndDelete(req.params?.id)
          serverMessage(res, 200, {message: 'Task deleted'});
        } else {
          serverMessage(res, 400, {message: 'User is not task owner'});
        }


      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  updateTaskById(){
    //endpoint ===> /api/task/edit/:id
    this.router.put(
      '/task/edit/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const userId: string = getIdByHeaderToken(res, req) as string;
        const user: IUser = await User.findById(userId);
        const task: ITask = await Task.findById(req.params?.id);
        if(userId === task.owner || user.admin){
        const {name, discription, dedline, status, priority} = req.body;
        const task: ITask = await Task.findByIdAndUpdate(req.params?.id, { name, discription, dedline, status, priority }, { new: true });
        res.json(task);
        } else {
          serverMessage(res, 400, {message: 'User is not task owner'});
        }
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
}