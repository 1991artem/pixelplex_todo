import { Router, Request, Response } from 'express';
import {Group} from '../models/groups';
import config from 'config';
import { check, validationResult } from 'express-validator';
import { ServerMessage, IGroup } from '../helps/interfaces';
import autorization from '../middleware/auth.middleware';


export default class GroupApi {
  private router = Router();
  groupRouter(){
    this.createGroup();
    return this.router;
  }
  createGroup(){
    //link ===> /api/group/create
    this.router.post(
      '/group/create',
      // [
      //   check('groupName', 'Name is empty').isEmpty()                // validation group name
      // ],
      async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req)          // check register tamplated validation
        console.log(errors)
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
        
        const user = new Group({ name, discription });       // create new group
        await user.save();

        this.serverMessage(res, 201, {message: 'Group created'});
      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  serverMessage(res, status, {errors = null, message}): ServerMessage {
    return res.status(status).json({ message: message });
  }
}