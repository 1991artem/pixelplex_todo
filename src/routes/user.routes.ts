import { Router, Response } from 'express';
import {User} from '../models/user';
import {Group} from '../models/groups';
import { ServerMessage, IGetUserAuthInfoRequest, IGroup } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';


export default class UserApi {
  private router = Router();
  userRouter(){
    this.showUsers();
    this.showUserById();
    this.addToGroup();
    return this.router;
  }
  showUsers(){
    //endpoint ===> /api/users
    this.router.get(
      '/users',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const user = await User.find();
        res.json(user)
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  showUserById(){
    //endpoint ===> /api/user
    this.router.get(
      '/user',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const user = await User.findById(req.user.userId)
        res.json(user)
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  addToGroup(){
    //endpoint ===> /api/user/group-add
    this.router.post(
      '/user/group-add',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const {group_name} = req.body;
        const isMatch: IGroup = await Group.findOne({ group_name })  
        console.log(isMatch);         // check group in DB
        if (!isMatch) {
          return this.serverMessage(res, 400, {message: 'This name is not in the DB'})
        }
        const userId: string = getIdByHeaderToken(res, req) as string;
        const user = await User.findById(userId);
        if(!user.groups.includes(group_name)) {
        user.groups.push(group_name);
        await user.save();
        } else {
          return this.serverMessage(res, 400, {message: 'This user includes the group'})
        }

        this.serverMessage(res, 201, {message: `User add to ${group_name}`});
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again' + e});
      }
    })
  }

  serverMessage(res, status, {message}): ServerMessage {
    return res.status(status).json({ message: message });
  }
}