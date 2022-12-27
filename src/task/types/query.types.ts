export type GetAllQuery = {
  pagination: {
    limit: number,
    offset: number,
  },
  sort: {
    type: string | undefined;
    field: string;
  },
  filter: {
    user: string;
  },
  includeGroupmatesTasks?: string
};
