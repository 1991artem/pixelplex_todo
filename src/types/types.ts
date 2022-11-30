import { PAGINATIONS, SORT_TYPE, SORT, SORT_FIELD } from './enums';

type Pagination = {
  [key in PAGINATIONS]: string;
};

type Sort = {
  [SORT_TYPE.TYPE]: SORT_TYPE;
  [SORT.FIELD]: SORT_FIELD;
};

export type QueryType = {
  pagination: Pagination,
  sort: Sort;
};
