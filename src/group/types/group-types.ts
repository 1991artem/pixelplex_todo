import { Group } from 'group/entity/group.entity';

export type GroupType = Group | null;

export type QueryType = {
    paginations: {
      limit: number,
      offset: number,
    },
    sort: {
      type: string | undefined;
      field: string;
    }
  };
