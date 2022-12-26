import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User, UserType, UserCreateDTO, UserRepository } from '@user';
import { AppError } from '@errors';
import { STATUS_CODE } from '@constants';
import { UserAuthDTO } from './dtos/auth.dtos';

class AuthService {
  secretKey: string | undefined;
  tokenLifetime: string | undefined;
  constructor() {
    this.secretKey = process.env.JWT_SECRET;
    this.tokenLifetime = process.env.TOKEN_LIFETIME;
    if (!this.secretKey || !this.tokenLifetime) {
      throw new AppError(STATUS_CODE.INTERNAL_SERVER_ERROR, 'JWT_SECRET and TOKEN_LIFETIME environment variables are not defined');
    }
  };
  async createUser(userDTO: UserCreateDTO): Promise<User> {
    const { email, password, name } = userDTO;
    const hashedPassword = await hash(password, 12);
    const candidate: UserType = await UserRepository.findOneByEmail(email);
    if (candidate) {
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

  async login(userDTO: UserAuthDTO): Promise<string> {
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
    const token: string = this.getJtwToken(`${user?.id}`, user?.role, user?.name);
    return token;
  }

  getJtwToken(id: string, role: string, name: string): string {
    return sign({ id, role, name }, this.secretKey as string, {
      expiresIn: this.tokenLifetime,
    });
  }
}

export const authService = new AuthService();
