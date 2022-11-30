import { checkSchema } from 'express-validator';
import { SORT_TYPE, SORT_FIELD } from '../types/enums';

const paginationParams = checkSchema({
  'pagination.[limit]': {
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
  'pagination.[offset]': {
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
  'sort.[type]': {
    in: 'query',
    toLowerCase: true,
    isIn: {
      options: [Object.values(SORT_TYPE)],
    },
    trim: true,
    escape: true,
    optional: true,
    errorMessage: 'Sort params is invalid',
  },
  'sort.[field]': {
    in: 'query',
    toLowerCase: true,
    isIn: {
      options: [Object.values(SORT_FIELD)],
    },
    trim: true,
    escape: true,
    optional: true,
    errorMessage: 'Sort params is invalid',
  },
});

const idParams = checkSchema({
  id: {
    in: ['params'],
    trim: true,
    isInt: true,
    escape: true,
    errorMessage: 'ID is invalid',
  },
});

export {
  idParams,
  paginationParams,
};
