import { Router, Request, Response } from 'express';
import {User} from '../models/user';
import config from 'config';
import { ServerMessage, IGetUserAuthInfoRequest } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';


export default class UserApi {
  private router = Router();
  userRouter(){
    this.showUsers();
    this.showUserById();
    return this.router;
  }
  showUsers(){
    //link ===> /api/users
    this.router.get(
      '/users',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const user = await User.find();
        console.log(user)
        res.json(user)
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  showUserById(){
    //link ===> /api/user
    this.router.get(
      '/user',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
        console.log(req)
      try {
        const user = await User.findById(req.user.userId)
        res.json(user)
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  serverMessage(res, status, {errors = null, message}): ServerMessage {
    return res.status(status).json({ message: message });
  }
}