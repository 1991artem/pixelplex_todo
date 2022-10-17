import { Router, Request, Response } from 'express';
import {User} from '../models/user';
import config from 'config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { IUser } from '../helps/interfaces';
import { serverMessage } from '../helps/errorHandler';


export default class AuthApi {
  private router = Router();
  authRouter(){
    this.registration();
    this.login()
    return this.router;
  }
  registration(){
    //endpoint ===> /api/auth/register
    this.router.post(
      '/auth/register',
      [
        check('email', 'Incorrect email').isEmail(),                 // validation email
        check('password', 'Minimum password length 8 characters and maximum password length 256 characters')         // validation Password
        .isLength({ min:8, max: 256 }),
        check('password', 'Minimum once lower case symbol')         // validation Password
        .isStrongPassword ({ minLowercase: 1 }),
        check('password', 'Minimum once upper case symbol')         // validation Password
        .isStrongPassword ({ minUppercase: 1 }),
        check('password', 'Password must contain numbers. For example => !@#$%^&*_-=+')         // validation Password
        .isStrongPassword ({ minSymbols: 1 }),
        check('password', 'Password must contain numbers')         // validation Password
        .isStrongPassword ({ minNumbers: 1}),
        check('username', 'Minimum name length 5 characters')         // validation username
        .isLength({ min:5, max: 256 })
      ],
      async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req)          // check register tamplated validation
        if (!errors.isEmpty()) {
          return serverMessage(res, 400, {errors: errors.array(), message: 'Incorrect data during registration'})
        }

        const {username, email, password} = req.body;

        const isMatch: IUser = await User.findOne({ username })           // check user in DB
        if (isMatch) {
          return serverMessage(res, 400, {message: 'This user already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);               // hash password
        
        const user = new User({ username, email, password: hashedPassword });       // create new user
        await user.save();

        serverMessage(res, 201, {message: 'User created'});

      } catch (e) {
        serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'});
      }
    })
  }

  login(){
  //endpoint ===> /api/auth/login
  this.router.post(
    '/auth/login',
    [
      check('email', 'Minimum name length 5 characters').isEmail(),
      check('password', 'Minimum password length 8 characters and maximum password length 256 characters').isLength({ min:8, max: 256 }),
    ],
    async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)                // check login tamplated validation
  
      if (!errors.isEmpty()) {
        return serverMessage(res, 400, {errors: errors.array(), message: 'Incorrect login information'})
      }
  
      const {email, password} = req.body
  
      const user: IUser = await User.findOne({ email })              // check db.user and login user

      if (!user) {
        return serverMessage(res, 400, {message: 'User is not found'})
      }
  
      const isMatch = await bcrypt.compare(password, user.password)             // check db.user.password and enter password
  
      if (!isMatch) {
        return serverMessage(res, 400, {message: 'Wrong password, please try again'})
      }
      
      res.json({ token: this.getJwtToken(user), userId: user.id })              // request token to client
  
    } catch (e) {
      serverMessage(res, 500, {message: 'Uuppss :( Something went wrong, please try again'})
    }
  })
  }
  getJwtToken(user){ 
    const tokenLifetime: string = config.get('tokenLifetime')                   // request token to client
    return jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: tokenLifetime }
    )
  }
}

  

  