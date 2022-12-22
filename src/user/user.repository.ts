import { AppDataSource } from '../data-source';
import { UserCreateDTO } from './dtos/user.dtos';
import { User } from './entity/user.entity';
import { UserType } from './types/user-types';

export class UserRepository {
  private static _usersRepository = AppDataSource.getRepository(User);
  static async findOneByEmail(email: string): Promise<User | null> {
    const user: UserType = await this._usersRepository.findOneBy({
      email,
    });
    return user;
  }

  static async findOneById(id: number): Promise<User | null> {
    const user: UserType = await this._usersRepository.findOneBy({
      id,
    });
    return user;
  }

  static async getUserById(id: number): Promise<User | null> {
    const user: UserType = await this._usersRepository.findOne({
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
    const user: UserType = await this._usersRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        groups: true,
      },
    });
    return user;
  }

  static async createUser(authParams: UserCreateDTO): Promise<User> {
    const user: User = this._usersRepository.create(authParams);
    await this._usersRepository.save(user);
    return user;
  }
}
