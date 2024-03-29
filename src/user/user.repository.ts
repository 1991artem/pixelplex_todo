import { UserAuthBody } from 'auth/types/body.types';
import { AppDataSource } from '../data-source';
import { User } from './entity/user.entity';

export class UserRepository {
  private static _usersRepository = AppDataSource.getRepository(User);
  static async findOneByEmail(email: string): Promise<User | null> {
    const user: User | null = await this._usersRepository.findOneBy({
      email,
    });
    return user;
  }

  static async findOneById(id: number): Promise<User | null> {
    const user: User | null = await this._usersRepository.findOneBy({
      id,
    });
    return user;
  }

  static async getUserById(id: number): Promise<User | null> {
    const user: User | null = await this._usersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        tasks: true,
      },
    });
    return user;
  }

  static async getUserByIdWithGroup(id: number): Promise<User | null> {
    const user: User | null = await this._usersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        groups: true,
      },
    });
    return user;
  }

  static async createUser(authParams: UserAuthBody): Promise<User> {
    const user: User = this._usersRepository.create(authParams);
    await this._usersRepository.save(user);
    return user;
  }
}
