import { AppError } from '@errors';
import { User, UserRepository } from '@user';
import { STATUS_CODE } from '@constants';
import { Group } from './entity/group.entity';
import { GroupRepository } from './group.repository';
import { GetAllGroupResponse, GetGroupByIdParams, QueryParams } from './types/group-types';
import { GetAllQueryParams } from './types/query.types';
import { CreateGroupBody, UpdateGroupBody, UserInGroupBody } from './types/body.types';

export class GroupService {
  static async createGroup(groupDTO: CreateGroupBody): Promise<Group> {
    const group: Group | null = await GroupRepository.getGroupByName(groupDTO.name);
    if (group) {
      throw new AppError(STATUS_CODE.UNPROCESSABLE_ENTITY,
        'Group already exists',
      );
    }
    return GroupRepository.createGroup(groupDTO);
  }
  static async getAllGroups(queryParams: Partial<GetAllQueryParams>): Promise<GetAllGroupResponse> {
    const { pagination, sort } = queryParams;
    const params: QueryParams = {
      limit: pagination?.limit ? Number(pagination?.limit) : undefined,
      offset: pagination?.offset ? Number(pagination?.offset) : undefined,
      type: sort?.type ? sort?.type.toUpperCase() : undefined,
      field: sort?.field ? sort?.field.toLowerCase() : undefined,
    };
    const groups: Group[] = await GroupRepository.getAllGroups(params);
    if (!groups.length) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Groups not found',
      );
    }
    const allGroupResponse: GetAllGroupResponse = {
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
  static async getGroupById(id: string): Promise<GetGroupByIdParams> {
    const group: Group | null = await GroupRepository.getGroupById(Number(id));
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
    const group: Group | null = await GroupRepository.getGroupById(Number(id));
    if (!group) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Group not found',
      );
    }
    await GroupRepository.deleteGroup(group);
  }
  static async updateGroupById(id: string, updateBody: UpdateGroupBody): Promise<Partial<Group>> {
    const group: Group | null = await GroupRepository.getGroupById(Number(id));
    if (!group) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Group not found',
      );
    }
    const updatedGroup: Group | null = await GroupRepository.updateGroupById(Number(id), updateBody);
    if (!updatedGroup) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'Group not updated',
      );
    }
    return {
      id: updatedGroup.id,
      name: updatedGroup.name,
      description: updatedGroup.description,
    };
  }
  static async addUserToGroup(data: UserInGroupBody): Promise<void> {
    const { userId, groupId } = data;
    const user: User | null = await UserRepository.findOneById(Number(userId));
    const group: Group | null = await GroupRepository.getGroupById(Number(groupId));
    if (!user) {
      throw new AppError(STATUS_CODE.NOT_FOUND, 'User not found');
    }
    if (!group) {
      throw new AppError(STATUS_CODE.NOT_FOUND, 'Group not found');
    }
    await GroupRepository.addUserToGroup(group, user);
  }
  static async removeUserFromGroup(data: UserInGroupBody): Promise<void> {
    const { userId, groupId } = data;
    const user: User | null = await UserRepository.findOneById(Number(userId));
    const group: Group | null = await GroupRepository.getGroupById(Number(groupId));
    if (!user) {
      throw new AppError(STATUS_CODE.NOT_FOUND, 'User not found');
    }
    if (!group) {
      throw new AppError(STATUS_CODE.NOT_FOUND, 'Group not found');
    }
    await GroupRepository.removeUserFromGroup(group, user);
  }
}
