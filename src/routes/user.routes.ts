import { Router, Response } from 'express';
import {User} from '../models/user';
import {Group} from '../models/groups';
import {Task} from '../models/task';
import { IGetUserAuthInfoRequest, IGroup, IUser } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';
import { serverMessage } from '../helps/errorHandler';

export default class UserApi {
  private router = Router();
  userRouter(){
    this.showUsers();
    this.showUserById();
    this.addToGroup();
    this.removeGroupFromUser();
    this.deleteUserById();
    return this.router;
  }
  showUsers(){
    //endpoint ===> /api/users
    this.router.get(
      '/users',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const users = await User.find();
        res.json(users)
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
    this.router.put(
      '/user/group-add/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const group = {
          id: req.params?.id,
        }
        const isMatch: IGroup = await Group.findById(group.id)       // check group in DB
        if (!isMatch) {
          return serverMessage(res, 400, {message: 'This name is not in the DB'})
        }
        const userId: string = getIdByHeaderToken(res, req) as string;
        const user: IUser = await User.findById(userId);
        if(!user.groups.includes(group.id) && user.admin) {
        user.groups.push(group.id);
        await user.save();
        } else {
          return !user.admin ? 
          serverMessage(res, 403, {message: 'You do not have permission for this operation'}) 
          : serverMessage(res, 400, {message: 'This user includes the group'})
        }
        serverMessage(res, 201, {message: 'User add to group'});
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  removeGroupFromUser(){
    //endpoint ===> /api/user/group-add
    this.router.put(
      '/user/group-remove/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const group = {
          id: req.params?.id,
        }
        const isMatch: IGroup = await Group.findById(group.id)       // check group in DB
        if (!isMatch) {
          return serverMessage(res, 400, {message: 'This name is not in the DB'})
        }
        const userId: string = getIdByHeaderToken(res, req) as string;
        const user: IUser = await User.findById(userId);
        if(user.groups.includes(group.id) && !user.admin) {
          console.log(user.groups)
          const groupIndex = user.groups.indexOf(group.id);
          user.groups.splice(groupIndex, 1);
          console.log(user.groups)
          await user.save();
        } else {
          return !user.admin ? 
          serverMessage(res, 403, {message: 'You do not have permission for this operation'}) 
          : serverMessage(res, 400, {message: 'This user not includes the group'})
        }
        serverMessage(res, 201, {message: 'User removed from group'});
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  deleteUserById(){
    //endpoint ===> /api/user/delete/:id
    this.router.delete(
      '/user/delete/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const deletedId = req.params.id;
        const userId: string = getIdByHeaderToken(res, req) as string;
        const admin: IUser = await User.findById(userId);
        if (!admin) {
          return serverMessage(res, 403, {message: 'You do not have permission for this operation'})
        }
        const user: IUser = await User.findById(deletedId);
        if (!user) {
          return serverMessage(res, 400, {message: 'User not faund'})
        }
          await Task.deleteMany({ owher: deletedId})
          await user.delete();
          serverMessage(res, 200, {message: 'User deleted'});
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
}