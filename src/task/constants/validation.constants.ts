import { ParamSchema } from 'express-validator';
import { TASK_STATUS, TASK_PRIORITY } from './task.constants';

type Pagination = {
  limit: ParamSchema,
  offset: ParamSchema,
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

const id: ParamSchema = {
  in: ['params'],
  trim: true,
  isInt: true,
  escape: true,
  errorMessage: 'ID is invalid',
};

const paginations: Pagination = {
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
  type: {
    in: 'query',
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
    isIn: {
      options: [['date', 'name']],
    },
    trim: true,
    escape: true,
    optional: true,
    errorMessage: 'Sort params is invalid',
  },
};

const task: Task = {
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

export { id, paginations, task };
