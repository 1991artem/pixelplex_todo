import { Group } from 'group/entity/group.entity';

export type GroupType = Group | null;

export type QueryType = {
    pagination: {
      limit: number,
      offset: number,
    },
    sort: {
      type: string | undefined;
      field: string;
    }
  };
