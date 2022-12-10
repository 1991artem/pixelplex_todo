import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../errors/app.error';
import { STATUS_CODE } from '../types/enums';
import { UserCreateDTO } from '../user/dtos/user.dtos';
import { User } from '../user/entity/user.entity';
import { UserProvider } from '../user/user.repository';
import { UserAuthDTO } from './dtos/auth.dtos';

class AuthService {
  async userCreate(userDTO: UserCreateDTO): Promise<User | void> {
    const { email, password, name } = userDTO;
    const hashedPassword = await hash(password as string, 12); // hash password
    const condidate = await UserProvider.findOneByEmail(email); // check user in DB
    if (condidate) {
      throw new AppError(STATUS_CODE.UNPROCESSABLE_ENTITY,
        'User with this email address already exists',
      );
    }
    const authParams: UserCreateDTO = {
      name,
      email,
      password: hashedPassword,
    };
    UserProvider.createUser(authParams); // create new user
    return UserProvider.createUser(authParams); // create new user
  }

  async userLogin(userDTO: UserAuthDTO): Promise<string> {
    const { email, password } = userDTO;
    const user = await UserProvider.findOneByEmail(email); // check user in DB
    if (!user) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'User not found',
      );
    }
    const isMatch: boolean = await compare(password, user?.password);
    if (!isMatch) {
      throw new AppError(STATUS_CODE.UNAUTHORIZED,
        'Authentification failed. Check your email/password.',
      );
    }
    const token = this.getJtwToken(`${user?.id}`, user?.role, user?.name);
    return token;
  }

  getJtwToken(id: string, role: string, name: string): string {
    const tokenLifetime: string = '4h';
    if (!process.env.JWT_SECRET) {
      return '';
    }
    return sign({ id, role, name }, process.env.JWT_SECRET, {
      expiresIn: tokenLifetime,
    });
  }
}

export const authService = new AuthService();
