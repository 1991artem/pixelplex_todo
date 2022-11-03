import { AuthParams } from '../helps/interfaces';
import AppError from '../helps/AppError';
import { User } from '../models/UserSchema';
import { compare, hash } from 'bcryptjs';

export default class AuthService {
  static async userCreate( authParams: AuthParams): Promise<User> {
    try {
      const {email, password, name} = authParams;
      const hashedPassword = await hash( password as string, 12 ); // hash password
      const condidate = await User.findOne({where: {email: email} }); // check user in DB
      if (condidate) {
        throw new AppError('User with this email address already exists', 422);
      }
      const user = await User.create({name, email, password: hashedPassword}); // create new user
      return user;
    } catch (error: any) {
      throw new AppError(error.message, error.statusCode);
    }
  }

  static async userLogin(authParams: AuthParams): Promise<User> {
    try {
      const { email, password } = authParams;
      const user = await User.findOne({where: {email: email} }); // check db.user and login user
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

