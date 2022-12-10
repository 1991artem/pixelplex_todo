import { checkSchema } from 'express-validator';
import { SORT_FIELD, SORT_TYPE } from '../types/enums';

const createGroup = checkSchema({
  name: {
    notEmpty: true,
    trim: true,
    escape: true,
    errorMessage: 'Name required',
  },
  description: {
    trim: true,
    escape: true,
  },
});

const updateGroupById = checkSchema({
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
});

const userInGroup = checkSchema({
  userId: {
    trim: true,
    isInt: true,
    escape: true,
    notEmpty: true,
    errorMessage: 'userId is invalid',
  },
  groupId: {
    trim: true,
    isInt: true,
    escape: true,
    notEmpty: true,
    errorMessage: 'groupId is invalid',
  },
});

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
  userInGroup,
  updateGroupById,
  createGroup,
  idParams,
  paginationParams,
};
