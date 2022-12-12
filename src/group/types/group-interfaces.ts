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

export interface IGroupPaginationsParams {
  limit: number;
  offset: number;
  type: string | undefined;
  field: string;
};

export interface IGetGroupById {
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  users: Partial<User>[],
}

export type QueryPaginationType = {
  paginations: {
    limit: number,
    offset: number,
  },
  sort: {
    type: string | undefined;
    field: string;
  }
};
