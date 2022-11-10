import { Schema } from 'express-validator';
import { TASK_STATUS, TASK_PRIORITY, SORT_FIELD, SORT_TYPE } from '../../helps/enums';

export default class TaskParamsValidation {
  static  validationTaskParamsId: Schema = {
      id: {
        in: ['params'],
        trim: true,
        isInt: true,
        toInt: true,
        escape: true,
        errorMessage: 'ID is wrong',
      }
    }

    static  validationTaskDTO: Schema = {
      name: {
        notEmpty: true,
        trim: true,
        escape: true,
        errorMessage: 'Name cannot be missing',
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
          options: value => new Date(value) > new Date()
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
      }
    }

    static  validationUpdateTaskBody: Schema = {
      name: {
        notEmpty: true,
        trim: true,
        escape: true,
        optional: true,
        errorMessage: 'Name cannot be missing',
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
          options: value => new Date(value) > new Date()
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
      }
    }

    static  validationPaginationQueryParams: Schema = {
      'pagination.[limit]': {
        in: "query",
        trim: true,
        escape: true,
        isInt: true,
        toInt: true,
        optional: true,
        custom: {
          options: value => value >=0
        },
        errorMessage: 'Pagination params is wrong',
      },
      'pagination.[offset]': {
        in: "query",
        trim: true,
        escape: true,
        isInt: true,
        toInt: true,
        optional: true,
        custom: {
          options: value => value >=0
        },
        errorMessage: 'Pagination params is wrong',
      },
      'sort.[type]': {
        in: "query",
        toLowerCase: true,
        isIn: {
          options: [Object.values(SORT_TYPE)],
        },
        trim: true,
        escape: true,
        optional: true,
        errorMessage: 'Sort params is wrong',
      },
      'sort.[field]': {
        in: "query",
        toLowerCase: true,
        isIn: {
          options: [Object.values(SORT_FIELD)],
        },
        trim: true,
        escape: true,
        optional: true,
        errorMessage: 'Sort params is wrong',
      }
    }
}
