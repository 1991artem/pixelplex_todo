import { checkSchema } from 'express-validator';
import { TASK_STATUS, TASK_PRIORITY } from '../../types/enums';

const createTask = checkSchema({
  name: {
    notEmpty: true,
    trim: true,
    escape: true,
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
});

const updateTaskById = checkSchema({
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
});

export {
  createTask,
  updateTaskById,
};
