import { Router, Response } from 'express';
import {Group} from '../models/groups';
import { check, validationResult } from 'express-validator';
import { ServerMessage, IGroup, IGetUserAuthInfoRequest } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';
import getIdByHeaderToken from '../helps/decodedToken';


export default class GroupApi {
  private router = Router();
  groupRouter(){
    this.createGroup();
    this.showGroups();
    this.showGroupById()
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
          return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data'
          })
        }

        const {name, discription} = req.body;
        const isMatch: IGroup = await Group.findOne({ name })           // check group in DB
        if (isMatch) {
          return this.serverMessage(res, 400, {message: 'This group already exists'})
        }
        const userId: string = getIdByHeaderToken(res, req) as string;
        const group = new Group({ name, discription, owner: userId });       // create new group
        await group.save();

        this.serverMessage(res, 201, {message: 'Group created'});
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again' + e});
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
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  showGroupById(){
    //endpoint ===> /api/group
    this.router.get(
      '/group',
      autorization,
      async (req: IGetUserAuthInfoRequest, res: Response) => {
      try {
        const group: IGroup = await Group.findById(req.user.userId)
        res.json(group)
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }


  serverMessage(res, status, { message}): ServerMessage {
    return res.status(status).json({ message: message });
  }
}