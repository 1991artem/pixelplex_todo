import { Router, Response } from 'express';
import {Task} from '../models/task';
import { check, validationResult } from 'express-validator';
import { ServerMessage, IGetUserAuthInfoRequest, ITask } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken'


export default class TaskApi {
  private router = Router();
  taskRouter(){
    this.addTask();
    this.showTask();
    this.showTaskById()
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
          return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data'
          })
        }

        const {name, discription} = req.body;
        const isMatch: ITask = await Task.findOne({ name })           // check task in DB
        if (isMatch) {
          return this.serverMessage(res, 400, {message: 'This task already exists'})
        }
        const userId: string = getIdByHeaderToken(res, req) as string;
        const task = new Task({ name, discription,  owner: userId});       // create new task
        await task.save();




        this.serverMessage(res, 201, {message: 'Task created'});

      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again' + e});
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
        const task: ITask[] = await Task.find();
        res.json(task)
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  showTaskById(){
    //endpoint ===> /api/task
    this.router.get(
      '/task',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const task: ITask = await Task.findById(req.user.userId)
        res.json(task)
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }

  serverMessage(res, status, { message}): ServerMessage {
    return res.status(status).json({ message: message });
  }
}