import { User } from '@user';

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
  limit: number | undefined;
  offset: number | undefined;
  type: string | undefined;
  field: string | undefined;
};

export type GetGroupByIdResponse = {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  users: Partial<User>[],
};
