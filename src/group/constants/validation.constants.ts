import { ParamSchema } from 'express-validator';

type Pagination = {
  limit: ParamSchema,
  offset: ParamSchema,
  type: ParamSchema,
  field: ParamSchema,
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
    toLowerCase: true,
    isIn: {
      options: ['ASC', 'DESC'],
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
      options: ['data', 'name'],
    },
    trim: true,
    escape: true,
    optional: true,
    errorMessage: 'Sort params is invalid',
  },
};

const userId: ParamSchema = {
  trim: true,
  isInt: true,
  escape: true,
  notEmpty: true,
  errorMessage: 'userId is invalid',
};

const groupId: ParamSchema = {
  trim: true,
  isInt: true,
  escape: true,
  notEmpty: true,
  errorMessage: 'userId is invalid',
};

export { id, paginations, userId, groupId };
