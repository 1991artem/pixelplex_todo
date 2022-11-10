import { UserDTO } from '../helps/interfaces';
import { User } from '../user/entity/User';
import { compare, hash } from 'bcryptjs';
import { ApiError } from '../error/ApiError';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { UserRepository } from '../user/user.repository';

class AuthService {
  async userCreate( userDTO: UserDTO): Promise<User | void> {
      const {email, password, name} = userDTO;
      const hashedPassword = await hash( password as string, 12 ); // hash password
      const condidate = await UserRepository.findOneByEmail(email); // check user in DB
      if (condidate) {
        throw ApiError.UNPROCESSABLE_ENTITY('User with this email address already exists');
      }
      const authParams: UserDTO = {
        name, 
        email,
        password: hashedPassword
      }
      return await UserRepository.createUser(authParams) // create new user
  }

  async userLogin(userDTO: UserDTO): Promise<User> {
      const { email, password } = userDTO;
      const user = await UserRepository.findOneByEmail(email); // check user in DB
      if (!user) {
        throw ApiError.NOT_FOUND();
      }
      const isMatch: boolean = await compare( password, user?.password);
      if (!isMatch) {
        throw ApiError.UNAUTHORIZEN('Authentification failed. Check your email/password.');
      }
      return user;
  }

  getJtwToken(id: string, role: string, name: string): string {
    const tokenLifetime: string = config.get('tokenLifetime');
    if (!process.env.JWT_SECRET) {
      return '';
    };
    return sign(
      { id, role, name },
      process.env.JWT_SECRET,
      { expiresIn: tokenLifetime },
    );
  };
}

export const authService = new AuthService();

