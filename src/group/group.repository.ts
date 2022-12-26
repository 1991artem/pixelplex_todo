import { User } from '@user';
import { AppDataSource } from '../data-source';
import { CreateGroupDTO } from './dtos/group.dtos';
import { Group } from './entity/group.entity';
import { IGroupQueryParams } from './types/group-interfaces';
import { GroupType } from './types/group-types';

export class GroupRepository {
  private static _groupsRepository = AppDataSource.getRepository(Group);

  static async createGroup(groupDTO: CreateGroupDTO): Promise<Group> {
    const group: Group = this._groupsRepository.create(groupDTO);
    await this._groupsRepository.save(group);
    return group;
  }

  static async getAllGroups(paginationParams: IGroupQueryParams): Promise<Group[]> {
    const { limit, offset, field, type } = paginationParams;
    const groups: Group[] = await this._groupsRepository.find({
      relations: {
        users: true,
      },
      skip: offset,
      take: limit,
      order: {
        [field]: type,
      },
    });
    return groups;
  }
  static async getGroupById(id: number): Promise<Group | null> {
    const group: GroupType = await this._groupsRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        users: true,
      },
    });
    return group;
  }

  static async getGroupByName(groupName: string): Promise<Group | null> {
    const group: GroupType = await this._groupsRepository.findOne({
      where: {
        name: groupName,
      },
    });
    return group;
  }

  static async deleteGroup(group: Group): Promise<void> {
    await this._groupsRepository.remove(group);
  }
  static async updateGroupById(id: number, updateBody: Partial<CreateGroupDTO>): Promise<void> {
    await this._groupsRepository
      .createQueryBuilder()
      .update(Group)
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
