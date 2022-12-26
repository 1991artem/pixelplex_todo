import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User, UserType, UserCreateDTO, UserRepository } from '@user';
import { AppError } from '@errors';
import { STATUS_CODE } from '@constants';
import { UserAuthDTO } from './dtos/auth.dtos';

class AuthService {
  private _secretKey: string | undefined;
  private _tokenLifetime: string | undefined;
  constructor() {
    this._secretKey = process.env.JWT_SECRET;
    this._tokenLifetime = process.env.TOKEN_LIFETIME;
  };
  get secretKey(): string {
    if (!this._secretKey) throw new Error('JWT_SECRET environment variables are not defined');
    return this._secretKey;
  }
  get tokenLifetime(): string {
    if (!this._tokenLifetime) throw new Error('TOKEN_LIFETIME environment variables are not defined');
    return this._tokenLifetime;
  }
  async createUser(userDTO: UserCreateDTO): Promise<User> {
    const { email, password } = userDTO;
    const hashedPassword = await hash(password, 12);
    const candidate: UserType = await UserRepository.findOneByEmail(email);
    if (candidate) {
      throw new AppError(STATUS_CODE.UNPROCESSABLE_ENTITY,
        'User with this email address already exists',
      );
    }
    const user: User = await UserRepository.createUser({ ...userDTO, password: hashedPassword });
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
    const token: string = this.getJtwToken(user.id, user.role, user.name);
    return token;
  }

  getJtwToken(id: number, role: string, name: string): string {
    return sign({ id, role, name }, this.secretKey, {
      expiresIn: this.tokenLifetime,
    });
  }
}

export const authService = new AuthService();
