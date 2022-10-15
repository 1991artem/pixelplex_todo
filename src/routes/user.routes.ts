import { Router, Response } from 'express';
import {User} from '../models/user';
import {Group} from '../models/groups';
import { IGetUserAuthInfoRequest, IGroup } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';
import { serverMessage } from '../helps/errorHandler';


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
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  showUserById(){
    //endpoint ===> /api/user/:id
    this.router.get(
      '/user/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const user = await User.findById(req.params?.id)
        res.json(user)
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
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
        const {group_id} = req.body;
        const isMatch: IGroup = await Group.findById(group_id)       // check group in DB
        if (!isMatch) {
          return serverMessage(res, 400, {message: 'This name is not in the DB'})
        }
        const userId: string = getIdByHeaderToken(res, req) as string;
        const user = await User.findById(userId);
        if(!user.groups.includes(group_id)) {
        user.groups.push(group_id);
        await user.save();
        } else {
          return serverMessage(res, 400, {message: 'This user includes the group'})
        }

        serverMessage(res, 201, {message: 'User add to group'});
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again' + e});
      }
    })
  }
}