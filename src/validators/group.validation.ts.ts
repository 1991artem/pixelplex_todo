import { checkSchema } from 'express-validator';

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

export {
  userInGroup,
  updateGroupById,
  createGroup,
};
