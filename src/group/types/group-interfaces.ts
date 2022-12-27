import { User } from 'user/entity/user.entity';

export interface IGetAllGroupResponse {
  amount: number;
  groups: IGroupResponse[];
}

interface IGroupResponse {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  usersAmount: number
};

export interface IGroupQueryParams {
  limit: number;
  offset: number;
  type: string | undefined;
  field: string | undefined;
};

export interface IGetGroupById {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  users: Partial<User>[],
}

export interface RequestWithParamsId {
  id: string;
}

export interface UserInGroupRequest {
  userId: number;
  groupId: number;
}
