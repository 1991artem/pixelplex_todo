import { AppError } from 'errors/app.error';
import { User } from 'user/entity/user.entity';
import { STATUS_CODE } from '../constants';
import { AppDataSource } from '../../data-source';
import { GreateGroupDTO } from './dtos/group.dtos';
import { Group } from './entity/group.entity';
import { IGroupPaginationsParams } from './types/group-interfaces';
import { GroupType } from './types/group-types';

export class GroupRepository {
  private static _groupsRepository = AppDataSource.getRepository(Group);

  static async createGroup(groupDTO: GreateGroupDTO): Promise<Group> {
    const findGroup = await this.getGroupByName(groupDTO.name);

    if (findGroup) {
      throw new AppError(STATUS_CODE.UNPROCESSABLE_ENTITY,
        'Group already exists',
      );
    }
    const group: Group = this._groupsRepository.create(groupDTO);
    if (!group) {
      throw new AppError(STATUS_CODE.INTERNAL_SERVER_ERROR,
        'Group not created',
      );
    }
    await this._groupsRepository.save(group);
    return group;
  }

  static async getAllGroups(paginationParams: IGroupPaginationsParams): Promise<Group[]> {
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

    if (!groups.length) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Groups not found',
      );
    }
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

  static async getGroupByName(groupName: string): Promise<Group> {
    const group: GroupType = await this._groupsRepository.findOne({
      where: {
        name: groupName,
      },
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
