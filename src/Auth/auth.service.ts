import { UserType, IUser, AuthParams } from '../helps/interfaces';
import AppError from '../helps/AppError';
import { User } from '../models/UserSchema';
import { compare, hash } from 'bcryptjs';

export default class AuthService {
  static async userCreate( authParams: AuthParams): Promise<IUser> {
    try {
      const {email, password, name} = authParams;
      const hashedPassword = await hash( password as string, 12 ); // hash password
      const user: UserType = await User.findOne({ email }); // check user in DB
      if (user) {
        throw new AppError('User with this email address already exists', 422);
      }      
      return await User.create({name, email, password: hashedPassword}); // create new user
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  static async userLogin(authParams: AuthParams): Promise<IUser> {
    try {
      const { email, password } = authParams;
      const user: UserType = await User.findOne({ email }); // check db.user and login user
      if (!user) {
        throw new AppError('User is not found', 404);
      }
      const isMatch: boolean = await compare( password, user?.password);
      if (!isMatch) {
        throw new AppError('Wrong password, please try again', 404);
      }
      return user;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }

  }
}

