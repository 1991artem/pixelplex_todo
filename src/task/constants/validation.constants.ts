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

const LIMIT: ParamSchema = {
  in: 'query',
  trim: true,
  escape: true,
  isInt: {
    options: {
      min: 0,
    }
  },
  optional: true,
  errorMessage: 'Pagination params is invalid',
};

const OFFSET: ParamSchema = {
  in: 'query',
  trim: true,
  escape: true,
  isInt: {
    options: {
      min: 0,
    }
  },
  optional: true,
  errorMessage: 'Pagination params is invalid',
};

const TYPE: ParamSchema = {
  in: 'query',
  toLowerCase: true,
  isIn: {
    options: [['asc', 'desc']],
  },
  trim: true,
  escape: true,
  optional: true,
  errorMessage: 'Sort params is invalid',
};

const FIELD: ParamSchema = {
  in: 'query',
  toLowerCase: true,
  isIn: {
    options: [['date', 'name']],
  },
  trim: true,
  escape: true,
  optional: true,
  errorMessage: 'Sort params is invalid',
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
  isBoolean: true,
  trim: true,
  escape: true,
  optional: true,
  errorMessage: 'IncludeGroupmatesTasks params is invalid',
}

export { ID, LIMIT, TYPE, FIELD, OFFSET, TASK, USER_ID, INCLUDE_GROUPMATES_TASKS };
