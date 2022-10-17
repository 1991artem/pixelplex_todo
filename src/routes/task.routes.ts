import { Router, Response } from 'express';
import {Task} from '../models/task';
import {User} from '../models/user';
import config from 'config';
import { check, validationResult } from 'express-validator';
import { IGetUserAuthInfoRequest, ITask, IQueryParams, IUser, IPaginationsParams } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken'
import { serverMessage } from '../helps/errorHandler';
import sortData from '../helps/dataSort';
import getPaginationsParams from '../helps/getPaginationsParams';


export default class TaskApi {
  private router = Router();
  taskRouter(){
    this.addTask();
    this.showTask();
    this.showTaskById();
    this.deleteTaskById();
    this.updateTaskById();
    this.showTaskByGroupId();
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
        const defaultDeadline = Date.now() + config.get('defaultTime'); // add 1h to create task time
        const {name, description, status = 'to do', deadline = defaultDeadline, priority = 'high'} = req.body;
        if (deadline <= Date.now()) {
          return serverMessage(res, 400, {message: 'Wrong deadline time'})
        }
        const isMatch: ITask = await Task.findOne({ name })           // check task in DB
        if (isMatch) {
          return serverMessage(res, 400, {message: 'This task already exists'})
        }
        const userId: string = getIdByHeaderToken(res, req) as string;
        const task: ITask = new Task({ name, description, status, deadline, priority,  owner: userId});       // create new task
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
        const pagination: IPaginationsParams = getPaginationsParams(query, res) as IPaginationsParams;
        const task: ITask[] = await Task.find().limit(pagination.limit).skip(pagination.skip);
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
  showTaskByGroupId(){
    //endpoint ===> /api/task/group
    this.router.get(
      '/tasks/group/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const group: string = req.params?.id;
        const query: IQueryParams = req.query;
        const userId: string = getIdByHeaderToken(res, req) as string;
        const client: IUser = await User.findOne({_id: userId}, {groups: {
            $elemMatch: {
              $eq: group
            }
          }
        })

        if(!client && !client.admin){
          return serverMessage(res, 403, {message: 'You do not have permission for this operation'})
        }
        const pagination: IPaginationsParams = getPaginationsParams(query, res) as IPaginationsParams;
        // TODO change method. Don,t like use lot of connections to DB. Check banchmarks!!!!! Done!!!!
        const user: IUser[] = await User.find({
          groups: {
            $elemMatch: {
              $eq: group
            }
          }
        })
        const idArray: string[] = [];
          for(const element in user) {
              idArray.push(user[element]._id.toString())
        }

        const tasks: ITask[] = await Task.find({
          owner: {
            $in: idArray
          }
        }).limit(pagination.limit).skip(pagination.skip);
        //----------------------------------------------------------------

        const responseData = sortData(query, tasks)
        res.json(responseData)
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
        if(userId === task.owner.toString() || user.admin){
          await task.delete();
          serverMessage(res, 200, {message: 'Task deleted'});
        } else {
          return serverMessage(res, 403, {message: 'You do not have permission for this operation'}) 
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
        if(userId === task.owner.toString() || user.admin){
        const {name, description, deadline, status, priority} = req.body;
        const updateParams = {
          name,
          description,
          deadline,
          status: deadline < Date.now() ? undefined : status,
          priority
        };
        await task.updateOne( updateParams);
        await task.save();
        serverMessage(res, 200, {message: 'Task update'});
        } else {
          serverMessage(res, 403, {message: 'You do not have permission for this operation'}) 
        }
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
}
