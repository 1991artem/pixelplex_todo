import { UserRepository } from 'user/user.repository';
import { AppError } from 'errors/app.error';
import { User } from 'user/entity/user.entity';
import { UserType } from '../user/types/user-types';
import { STATUS_CODE } from '../constants';
import { GreateGroupDTO, UserInGroupDTO } from './dtos/group.dtos';
import { Group } from './entity/group.entity';
import { GroupRepository } from './group.repository';
import { IGetAllGroupResponse, IGetGroupById, IGroupPaginationsParams, QueryPaginationType } from './types/group-interfaces';
import { GroupType } from './types/group-types';

export class GroupService {
  static createGroup(groupDTO: GreateGroupDTO): Promise<Group> {
    return GroupRepository.createGroup(groupDTO);
  }
  static async getAllGroups(queryParams: Partial<QueryPaginationType>): Promise<IGetAllGroupResponse> {
    const { paginations, sort } = queryParams;
    const paginationParams: IGroupPaginationsParams = {
      limit: Number(paginations?.limit) || 10,
      offset: Number(paginations?.offset) || 0,
      type: sort?.type?.toUpperCase(),
      field: sort?.field?.toLowerCase() || 'name',
    };
    const groups: Group[] = await GroupRepository.getAllGroups(paginationParams);
    const allGroupResponse: IGetAllGroupResponse = {
      amount: groups.length,
      groups: groups.map((group: Group) => {
        return {
          id: group.id,
          name: group.name,
          description: group.description,
          createdAt: group.createdAt,
          usersAmount: group.users.length,
        };
      }),
    };
    return allGroupResponse;
  }
  static async getGroupById(id: string): Promise<IGetGroupById> {
    const group: Group = await GroupRepository.getGroupById(+id);
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      createdAt: group.createdAt,
      users: group.users.map((user: User) => {
        return {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        };
      }),
    };
  }
  static deleteGroupById(id: string): Promise<void> {
    return GroupRepository.deleteGroupById(+id);
  }
  static async updateGroupById(id: string, updateBody: Partial<GreateGroupDTO>): Promise<Partial<Group>> {
    await GroupRepository.updateGroupById(+id, updateBody);
    const group: Group = await GroupRepository.getGroupById(+id);
    return {
      id: group.id,
      name: group.name,
      description: group.description,
    };
  }
  static async addUserToGroup(data: UserInGroupDTO): Promise<void> {
    const { userId, groupId } = data;
    const user: UserType = await UserRepository.findOneById(+userId);
    const group: GroupType = await GroupRepository.getGroupById(+groupId);

    if (!user || !group) {
      throw new AppError(STATUS_CODE.NOT_FOUND, 'Group or User not found');
    }
    await GroupRepository.addUserToGroup(group, user);
  }
  static async removeUserFromGroup(data: UserInGroupDTO): Promise<void> {
    const { userId, groupId } = data;
    const user: UserType = await UserRepository.findOneById(+userId);
    const group: GroupType = await GroupRepository.getGroupById(+groupId);

    if (!user || !group) {
      throw new AppError(STATUS_CODE.NOT_FOUND, 'Group or User not found');
    }
    await GroupRepository.removeUserFromGroup(group, user);
  }
}
