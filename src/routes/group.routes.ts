import { Router, Response } from 'express';
import { check, validationResult } from 'express-validator';
import {Group} from '../models/groups';
import {User} from '../models/user';
import { IGroup, IGetUserAuthInfoRequest, IUser } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';
import { serverMessage } from '../helps/errorHandler';


export default class GroupApi {
  private router = Router();
  groupRouter(){
    this.createGroup();
    this.showGroups();
    this.showGroupById();
    this.deleteGroupById();
    return this.router;
  }
  createGroup(){
    //endpoint ===> /api/group/create
    this.router.post(
      '/group/create',
      autorization,
      [
        check('name', 'Name is empty').notEmpty()                // validation group name
      ],
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const errors = validationResult(req)          // check register tamplated validation

        if (!errors.isEmpty()) {
          return serverMessage(res, 400, {errors: errors.array(), message: 'Incorrect data'})
        }

        const {name, description} = req.body;
        const isMatch: IGroup = await Group.findOne({ name })           // check group in DB
        if (isMatch) {
          return serverMessage(res, 400, {message: 'This group already exists'})
        }

        const userId: string = getIdByHeaderToken(res, req) as string;
        const admin: IUser = await User.findById(userId);
        if(!admin.admin) {
          return serverMessage(res, 403, {message: 'You do not have permission for this operation'})
        }
        const group = new Group({ name, description, owner: userId });       // create new group
        await group.save();
        serverMessage(res, 201, {message: 'Group created'});
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again' + e});
      }
    })
  }
  showGroups(){
    //endpoint ===> /api/groups
    this.router.get(
      '/groups',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const groups: IGroup[] = await Group.find();
        res.json(groups)
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  showGroupById(){
    //endpoint ===> /api/group/:id
    this.router.get(
      '/group/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const group: IGroup = await Group.findById(req.params?.id)
        res.json(group)
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  deleteGroupById(){
    //endpoint ===> /api/group/delete/:id
    this.router.delete(
      '/group/delete/:id',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const deletedId = req.params.id;
        const userId: string = getIdByHeaderToken(res, req) as string;
        const admin: IUser = await User.findById(userId);
        if (!admin) {
          return serverMessage(res, 403, {message: 'You do not have permission for this operation'})
        }
        const group: IGroup = await Group.findById(deletedId);
        if (!group) {
          return serverMessage(res, 400, {message: 'Group not faund'})
        }
        console.log(group)
        await User.updateMany({
          groups: {
            $elemMatch: {
              $eq: group
            }
          }
        },
        {
          $pull: {
            groups: deletedId
          }     
      })
        await group.delete();
        serverMessage(res, 200, {message: 'Group deleted'});
      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
}