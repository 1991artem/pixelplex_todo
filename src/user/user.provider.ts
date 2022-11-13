import { AppDataSource } from "../data-source";
import { UserDTO } from "../helps/interfaces";
import { User } from "./entity/User";

export class UserProvider {
  private static _usersRepository = AppDataSource.getRepository(User);
  static findOneByEmail(email: string){
    return this._usersRepository.findOneBy({
      email
    })
  }
  static async createUser(authParams: UserDTO){
    const user = this._usersRepository.create(authParams).save();
    return user; // create new user
  }
}