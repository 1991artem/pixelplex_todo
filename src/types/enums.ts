export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export enum TASK_STATUS {
  TO_DO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export enum TASK_PRIORITY {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}

export enum SORT_TYPE {
  ASC = 'asc',
  DESC = 'desc',
  TYPE = 'TYPE'
}

export enum SORT_FIELD {
  DATE = 'date',
  NAME = 'name',
}

export enum PAGINATIONS {
  LIMIT = 'limit',
  OFFSET = 'offset',
}

export enum SORT {
  TYPE = 'type',
  FIELD = 'field',
}

export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}
