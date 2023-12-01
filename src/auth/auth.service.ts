import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User, UserRepository } from '@user';
import { AppError } from '@errors';
import { STATUS_CODE } from '@constants';
import { config } from 'config';
import { CreateUserBody, UserAuthBody } from './types/body.types';

class AuthService {
  async createUser(userDTO: CreateUserBody): Promise<User> {
    const { email, password } = userDTO;
    const hashedPassword = await hash(password, 12);
    const candidate: User | null = await UserRepository.findOneByEmail(email);
    if (candidate) {
      throw new AppError(STATUS_CODE.UNPROCESSABLE_ENTITY,
        'User with this email address already exists',
      );
    }
    const user: User = await UserRepository.createUser({ ...userDTO, password: hashedPassword });
    return user;
  }

  async login(userDTO: UserAuthBody): Promise<string> {
    const { email, password } = userDTO;
    const user: User | null = await UserRepository.findOneByEmail(email);
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
    const token: string = this.getJtwToken(user.id, user.role);
    return token;
  }

  getJtwToken(id: number, role: string): string {
    return sign({ id, role }, config.DEV.JWT_SECRET, {
      expiresIn: config.DEV.TOKEN_LIFETIME,
    });
  }
}

export const authService = new AuthService();
