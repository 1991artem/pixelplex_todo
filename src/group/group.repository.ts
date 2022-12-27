import { User } from '@user';
import { AppDataSource } from '../data-source';
import { Group } from './entity/group.entity';
import { CreateGroupBody } from './types/body.types';
import { QueryParams } from './types/group-types';

export class GroupRepository {
  private static _groupsRepository = AppDataSource.getRepository(Group);

  static async createGroup(groupDTO: CreateGroupBody): Promise<Group> {
    const group: Group = this._groupsRepository.create(groupDTO);
    await this._groupsRepository.save(group);
    return group;
  }

  static async getAllGroups(params: QueryParams): Promise<Group[]> {
    const { limit, offset, field, type } = params;
    const groups: Group[] = await this._groupsRepository.find({
      relations: {
        users: true,
      },
      skip: offset,
      take: limit,
      order: field ?
        {
          [field]: type,
        }
        : undefined,
    });
    return groups;
  }
  static async getGroupById(id: number): Promise<Group | null> {
    const group: Group | null = await this._groupsRepository.findOne({
      where: {
        id,
      },
      relations: {
        users: true,
      },
    });
    return group;
  }

  static async getGroupByName(groupName: string): Promise<Group | null> {
    const group: Group | null = await this._groupsRepository.findOne({
      where: {
        name: groupName,
      },
    });
    return group;
  }

  static async deleteGroup(group: Group): Promise<void> {
    await this._groupsRepository.remove(group);
  }
  static async updateGroupById(id: number, updateBody: Partial<CreateGroupBody>): Promise<Group | null> {
    const updateResult = await this._groupsRepository
      .createQueryBuilder()
      .update(Group)
      .returning('*')
      .updateEntity(true)
      .set({ ...updateBody })
      .where( { id })
      .execute();

    const [updatedGroup] = updateResult.raw as Group[];
    if (!updatedGroup) {
      return null;
    }
    return updatedGroup;

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
