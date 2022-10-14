import { Router, Request, Response } from 'express';
import {User} from '../models/user';
import config from 'config';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import { IUser, ServerMessage } from '../helps/interfaces';


export default class TaskApi {
  private router = Router();

  addTask(){
    //link ===> /api/auth/register
    this.router.post(
      '/task',
      async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req)          // check register tamplated validation
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data during registration'
          })
        }

        const {username, email, password} = req.body;

        const isMatch: IUser = await User.findOne({ username })           // check user in DB
        if (isMatch) {
          return this.serverMessage(res, 400, {message: 'This user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);               // hash password
        
        const user = new User({ username, email, password: hashedPassword });       // create new user
        await user.save();

        this.serverMessage(res, 201, {message: 'User created'});

      } catch (e) {
        this.serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }
  serverMessage(res, status, {errors = null, message}): ServerMessage {
    return res.status(status).json({ message: message });
  }
}