import { Request } from 'express';
import { CreateGroupDTO } from 'group/dtos/group.dtos';
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

export interface CreateGroupRequest extends Request {
  body: CreateGroupDTO;
}

export interface GetAllRequest extends Request {
  body: CreateGroupDTO;
}

export interface RequestWithParamsId extends Request {
  params: {
    id: string;
  };
}

export interface UpdateGroupRequest extends Request {
  params: {
    id: string;
  };
  body: CreateGroupDTO;
}

export interface UserInGroupRequest extends Request {
  body: {
    userId: number;
    groupId: number;
  }
}
