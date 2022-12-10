/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppDataSource } from '../../data-source';
import { UserCreateDTO } from './dtos/user.dtos';
import { User } from './entity/user.entity';

export class UserProvider {
  private static _usersRepository = AppDataSource.getRepository(User);
  static findOneByEmail(email: string) {
    return this._usersRepository.findOneBy({
      email,
    });
  }
  static async createUser(authParams: UserCreateDTO) {
    const user: User = this._usersRepository.create(authParams);
    await this._usersRepository.save(user);
    return user; // create new user
  }
}
