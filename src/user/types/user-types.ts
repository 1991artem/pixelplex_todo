import { User } from 'user/entity/user.entity';

export type UserType = User | null;

export type UserStatistics = {
  to_do: {
    overdue: number,
    total: number;
  },
  in_progress: {
    overdue: number,
    total: number
  },
  done: number,
};
