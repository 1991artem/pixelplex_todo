import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User, UserType, UserCreateDTO, UserRepository } from '@user';
import { AppError } from '@errors';
import { STATUS_CODE } from '@constants';
import { UserAuthDTO } from './dtos/auth.dtos';

class AuthService {
  async userCreate(userDTO: UserCreateDTO): Promise<User> {
    const { email, password, name } = userDTO;
    const hashedPassword = await hash(password as string, 12);
    const condidate: UserType = await UserRepository.findOneByEmail(email);
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
    const user: User = await UserRepository.createUser(authParams);
    return user;
  }

  async userLogin(userDTO: UserAuthDTO): Promise<string | void> {
    const { email, password } = userDTO;
    const user: UserType = await UserRepository.findOneByEmail(email);
    if (!user) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'User not found',
      );
    }
    const isMatch: boolean = await compare(password, user.password);
    if (!isMatch) {
      throw new AppError(STATUS_CODE.UNAUTHORIZED,
        'Authentification failed. Check your email/password.',
      );
    }
    const token: string | void = this.getJtwToken(`${user?.id}`, user?.role, user?.name);
    return token;
  }

  getJtwToken(id: string, role: string, name: string): string | void {
    const tokenLifetime: string | undefined = process.env.TOKEN_LIFETIME;
    if (process.env.JWT_SECRET && process.env.TOKEN_LIFETIME) {
      return sign({ id, role, name }, process.env.JWT_SECRET, {
        expiresIn: tokenLifetime,
      });
    }
  }
}

export const authService = new AuthService();
