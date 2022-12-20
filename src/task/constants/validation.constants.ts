import { ParamSchema } from 'express-validator';
import { TASK_STATUS, TASK_PRIORITY } from './task.constants';

type Pagination = {
  limit: ParamSchema,
  offset: ParamSchema,
};

type Sort = {
  type: ParamSchema,
  field: ParamSchema,
};

type Task = {
  name: ParamSchema,
  description: ParamSchema,
  status: ParamSchema,
  deadline: ParamSchema,
  priority: ParamSchema,
};

const ID: ParamSchema = {
  in: ['params'],
  trim: true,
  isInt: true,
  escape: true,
  errorMessage: 'ID is invalid',
};

const USER_ID: ParamSchema = {
  in: ['params'],
  trim: true,
  escape: true,
  errorMessage: 'USER_ID is invalid',
};

const PAGINATIONS: Pagination = {
  limit: {
    in: 'query',
    trim: true,
    escape: true,
    isInt: true,
    optional: true,
    custom: {
      options: (value: string) => +value >= 0,
    },
    errorMessage: 'Pagination params is invalid',
  },
  offset: {
    in: 'query',
    trim: true,
    escape: true,
    isInt: true,
    optional: true,
    custom: {
      options: (value: string) => +value >= 0,
    },
    errorMessage: 'Pagination params is invalid',
  },
};


const SORT: Sort = {
  type: {
    in: 'query',
    toLowerCase: true,
    isIn: {
      options: [['asc', 'desc']],
    },
    trim: true,
    escape: true,
    optional: true,
    errorMessage: 'Sort params is invalid',
  },
  field: {
    in: 'query',
    toLowerCase: true,
    isIn: {
      options: [['date', 'name']],
    },
    trim: true,
    escape: true,
    optional: true,
    errorMessage: 'Sort params is invalid',
  },
};

const TASK: Task = {
  name: {
    notEmpty: true,
    trim: true,
    escape: true,
    optional: true,
    errorMessage: 'Name required',
  },
  description: {
    trim: true,
    escape: true,
    optional: true,
  },
  status: {
    trim: true,
    escape: true,
    toLowerCase: true,
    optional: true,
    isIn: {
      options: [Object.values(TASK_STATUS)],
    },
    errorMessage: 'Invalid status',
  },
  deadline: {
    trim: true,
    optional: true,
    isDate: {
      options: {
        format: 'YYYY-MM-DD',
        delimiters: ['/', '-'],
        strictMode: false,
      },
      errorMessage: 'Invalid Date format',
    },
    custom: {
      options: (value: string) => new Date(value) > new Date(),
    },
    errorMessage: 'Invalid deadline',
  },
  priority: {
    trim: true,
    escape: true,
    toLowerCase: true,
    optional: true,
    isIn: {
      options: [Object.values(TASK_PRIORITY)],
    },
    errorMessage: 'Invalid priority',
  },
};

const INCLUDE_GROUPMATES_TASKS: ParamSchema = {
  in: 'query',
  toLowerCase: true,
  isIn: {
    options: [['true', 'false']],
  },
  trim: true,
  escape: true,
  optional: true,
  errorMessage: 'IncludeGroupmatesTasks params is invalid',
}

export { ID, PAGINATIONS, SORT, TASK, USER_ID, INCLUDE_GROUPMATES_TASKS };
