import { AuthParams } from '../helps/interfaces';
import { User } from '../models/UserSchema';
import { compare, hash } from 'bcryptjs';
import { ApiError } from '../error/ApiError';

class AuthService {
  async userCreate( authParams: AuthParams): Promise<User | void> {
      const {email, password, name} = authParams;
      const hashedPassword = await hash( password as string, 12 ); // hash password
      const condidate = await User.findOne({where: {email: email} }); // check user in DB
      if (condidate) {
        throw ApiError.exists('User with this email address already exists');
      }
      const user = await User.create({name, email, password: hashedPassword}); // create new user
      return user;
  }

  async userLogin(authParams: AuthParams): Promise<User> {
      const { email, password } = authParams;
      const user = await User.findOne({where: {email: email} }); // check db.user and login user
      if (!user) {
        throw ApiError.badRequest('Not found');
      }
      const isMatch: boolean = await compare( password, user?.password);
      if (!isMatch) {
        throw ApiError.auth('Authentification failed. Check your email/password.');
      }
      return user;
  }
}

export const authService = new AuthService();

