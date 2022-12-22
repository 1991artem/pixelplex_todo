import { ParamSchema } from 'express-validator';

const ID: ParamSchema = {
  in: ['params'],
  trim: true,
  isInt: true,
  escape: true,
  errorMessage: 'ID is invalid',
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

export { ID, LIMIT, TYPE, FIELD, OFFSET, USER_ID, GROUP_ID };
