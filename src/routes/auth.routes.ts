import { Router, Request, Response } from 'express';
import config from 'config';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/user';
import { IUser, IAuthApi } from '../helps/interfaces';
import { serverMessage } from '../helps/errorHandler';
import { validate_reg_body, validate_login_body } from '../validate/validate';

export default class AuthApi implements IAuthApi {
  private router = Router();
  private baseAuthUrl = '/api/auth/';
  authRouter(): Router {
    this.router.post(`${this.baseAuthUrl}register`, validate_reg_body, this.registration_controller);
    this.router.post(`${this.baseAuthUrl}login`, validate_login_body, this.login_controller);
    return this.router;
  }
  async registration_controller( req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req); // check register tamplated validation
      if (!errors.isEmpty()) {
        serverMessage(res, 422, { errors: errors.array(), message: 'Invalid data' });
        return;
      }

      const { name, email, password } = req.body;
      const find_user: IUser | null = await User.findOne({ email }); // check user in DB
      if (find_user) {
        serverMessage(res, 400, { message: 'This user already exists' });
        return;
      }
      const hashedPassword = await hash( password, 12 ); // hash password
      const user = new User({ email, name, password: hashedPassword }); // create new user
      await user.save();
      serverMessage(res, 201, { message: 'User created' });
    } catch (error: any) {
      serverMessage(res, error.status, { message: error.message });
    }
  }

  async login_controller(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req); // check login tamplated validation
      if (!errors.isEmpty()) {
        serverMessage(res, 422, { errors: errors.array(), message: 'Invalid login' });
        return;
      }

      const { email, password } = req.body;
      const user: IUser | null = await User.findOne({ email }); // check db.user and login user
      if (!user) {
        serverMessage(res, 404, { message: 'User is not found' });
        return;
      }
      const isMatch: boolean = await compare(password, user?.password); // check db.user.password and enter password
      if (!isMatch) {
        serverMessage(res, 400, { message: 'Wrong password, please try again' });
        return;
      }

      const getJtwToken = (user_id: string): string => {
        const tokenLifetime: string = config.get('tokenLifetime');
        if (!process.env.JWT_SECRET) {
          return '';
        };
        return sign(
          { userId: user_id },
          process.env.JWT_SECRET,
          { expiresIn: tokenLifetime },
        );
      };

      res.json({ token: getJtwToken(user?.id), userId: user?.id, admin: user?.admin, name: user?.name }); // request token to client
    } catch (error: any) {
      serverMessage(res, error.status, { message: error.message });
    }
  }
}

