import { Task, TASK_STATUS } from '@task';
import { AppError } from '@errors';
import { STATUS_CODE } from '@constants';
import { User } from '@user';
import { UserStatistics } from './types/user-types';
import { UserRepository } from './user.repository';

export class UserService {
  static async getUserStatistics(id: string): Promise<UserStatistics> {
    const user: User | null = await UserRepository.getUserById(Number(id));
    if (!user) {
      throw new AppError(STATUS_CODE.NOT_FOUND,
        'User not found',
      );
    }
    const overdueStatusCounter = (status: string): number => {
      return user.tasks.reduce((acc: number, task: Task) => {
        if (task.status === status && Number(new Date(task.deadline)) < Date.now()) {
          return acc = acc + 1;
        }
        return acc;
      }, 0);
    };
    const statusCounter = (status: string): number => {
      return user.tasks.reduce((acc: number, task: Task) => {
        if (task.status === status) {
          return acc = acc + 1;
        }
        return acc;
      }, 0);
    };
    const statistics = {
      to_do: {
        overdue: overdueStatusCounter(TASK_STATUS.TO_DO),
        total: statusCounter(TASK_STATUS.TO_DO),
      },
      in_progress: {
        overdue: overdueStatusCounter(TASK_STATUS.IN_PROGRESS),
        total: statusCounter(TASK_STATUS.IN_PROGRESS),
      },
      done: user.tasks.length,
    };
    return statistics;
  }
}
