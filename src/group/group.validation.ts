import { checkSchema } from 'express-validator';
import { groupId, id, paginations, userId } from './constants';

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
  id: id,
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

const addUserToGroup = checkSchema({ userId, groupId });

const removeUserFromGroup = checkSchema({ userId, groupId });

const getGroupById = checkSchema({ id });

const deleteGroupById = checkSchema({ id });

const getAllGroups = checkSchema({
  'pagination.[limit]': paginations.limit,
  'pagination.[offset]': paginations.offset,
  'sort.[type]': paginations.type,
  'sort.[field]': paginations.field,
});

export {
  updateGroupById,
  createGroup,
  getAllGroups,
  getGroupById,
  deleteGroupById,
  addUserToGroup,
  removeUserFromGroup,
};
