import { AppError } from 'errors/app.error';
import { STATUS_CODE } from 'types/enums';
import { User } from 'user/entity/user.entity';
import { AppDataSource } from '../../data-source';
import { GreateGroupDTO } from './dtos/group.dtos';
import { Group } from './entity/group.entity';
import { IGroupPaginationsParams } from './types/group-interfaces';
import { GroupType } from './types/group-types';

export class GroupRepository {
  private static _groupsRepository = AppDataSource.getRepository(Group);

  static async createGroup(groupDTO: GreateGroupDTO): Promise<Group> {
    const group: Group = this._groupsRepository.create(groupDTO);
    if (!group) {
      throw new AppError(STATUS_CODE.INTERNAL_SERVER_ERROR,
        'User not created',
      );
    }
    await this._groupsRepository.save(group);
    return group;
  }

  static async getAllGroups(paginationParams: IGroupPaginationsParams): Promise<Group[]> {
    const { limit, offset, field, type } = paginationParams;
    const groups: Group[] = await this._groupsRepository
      .createQueryBuilder('group')
      .orderBy(field, type)
      .skip(offset)
      .take(limit)
      .getMany();

    if (!groups.length) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Groups not found',
      );
    }
    return groups;
  }
  static async getGroupById(id: number): Promise<Group> {
    const group: GroupType = await this._groupsRepository.findOneBy({
      id: id,
    });
    if (!group) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Group not found',
      );
    }
    return group;
  }
  static async deleteGroupById(id: number): Promise<void> {
    const group: Group = await this.getGroupById(id);
    await this._groupsRepository.remove(group);
  }
  static async updateGroupById(id: number, updateBody: Partial<GreateGroupDTO>): Promise<void> {
    await this._groupsRepository
      .createQueryBuilder()
      .update(User)
      .set({ ...updateBody })
      .where('id = :id', { id })
      .execute();
  }
  static async addUserToGroup(group: Group, user: User): Promise<void> {
    await this._groupsRepository.createQueryBuilder()
      .relation(Group, 'users')
      .of(group)
      .add(user);
  }
  static async removeUserFromGroup(group: Group, user: User): Promise<void> {
    await this._groupsRepository.createQueryBuilder()
      .relation(Group, 'users')
      .of(group)
      .remove(user);
  }
};
