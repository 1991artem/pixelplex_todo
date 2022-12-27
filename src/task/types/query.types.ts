export type GetAllQueryParams = {
  pagination?: {
    limit: number,
    offset: number,
  },
  sort?: {
    type: string;
    field: string;
  },
  filter?: {
    user: string;
  },
  includeGroupmatesTasks?: string
};
