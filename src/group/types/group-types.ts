import { User } from '@user';
import { Group } from 'group/entity/group.entity';

export type GroupType = Group | null;

export type GetAllGroupResponse = {
  amount: number;
  groups: GroupResponse[];
};

type GroupResponse = {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  usersAmount: number
};

export type QueryParams = {
  limit: number;
  offset: number;
  type: string | undefined;
  field: string | undefined;
};

export type GetGroupById = {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  users: Partial<User>[],
};
