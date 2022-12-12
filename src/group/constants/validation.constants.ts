import { ParamSchema } from 'express-validator';

type Pagination = {
  limit: ParamSchema,
  offset: ParamSchema,
  type: ParamSchema,
  field: ParamSchema,
};

const ID: ParamSchema = {
  in: ['params'],
  trim: true,
  isInt: true,
  escape: true,
  errorMessage: 'ID is invalid',
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

const USER_ID: ParamSchema = {
  trim: true,
  isInt: true,
  escape: true,
  notEmpty: true,
  errorMessage: 'userId is invalid',
};

const GROUP_ID: ParamSchema = {
  trim: true,
  isInt: true,
  escape: true,
  notEmpty: true,
  errorMessage: 'userId is invalid',
};

export { ID, PAGINATIONS, USER_ID, GROUP_ID };
