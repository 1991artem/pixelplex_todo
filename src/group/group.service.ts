import { AppError } from '@errors';
import { User, UserRepository, UserType } from '@user';
import { STATUS_CODE } from '@constants';
import { GreateGroupDTO, UserInGroupDTO } from './dtos/group.dtos';
import { Group } from './entity/group.entity';
import { GroupRepository } from './group.repository';
import { IGetAllGroupResponse, IGetGroupById, IGroupQueryParams } from './types/group-interfaces';
import { GroupType, QueryType } from './types/group-types';

export class GroupService {
  static async createGroup(groupDTO: GreateGroupDTO): Promise<Group> {
    const group: GroupType = await GroupRepository.getGroupByName(groupDTO.name);
    if (group) {
      throw new AppError(STATUS_CODE.UNPROCESSABLE_ENTITY,
        'Group already exists',
      );
    }
    return GroupRepository.createGroup(groupDTO);
  }
  static async getAllGroups(queryParams: Partial<QueryType>): Promise<IGetAllGroupResponse> {
    const { paginations, sort } = queryParams;
    const params: IGroupQueryParams = {
      limit: Number(paginations?.limit) || 10,
      offset: Number(paginations?.offset) || 0,
      type: sort?.type?.toUpperCase(),
      field: sort?.field?.toLowerCase() || 'name',
    };
    const groups: Group[] = await GroupRepository.getAllGroups(params);
    if (!groups.length) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Groups not found',
      );
    }
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
    const group: GroupType = await GroupRepository.getGroupById(+id);
    if (!group) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Group not found',
      );
    }
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
  static async deleteGroupById(id: string): Promise<void> {
    const group: GroupType = await GroupRepository.getGroupById(+id);
    if (!group) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Group not found',
      );
    }
    await GroupRepository.deleteGroup(group);
  }
  static async updateGroupById(id: string, updateBody: Partial<GreateGroupDTO>): Promise<Partial<Group>> {
    const group: GroupType = await GroupRepository.getGroupById(+id);
    if (!group) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Group not found',
      );
    }
    await GroupRepository.updateGroupById(+id, updateBody);

    const updatedGroup: GroupType = await GroupRepository.getGroupById(+id);
    if (!updatedGroup) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Group not found',
      );
    }
    return {
      id: updatedGroup.id,
      name: updatedGroup.name,
      description: updatedGroup.description,
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
