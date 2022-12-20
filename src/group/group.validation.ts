import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

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
  id: VALIDATION_SCHEMAS.ID,
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

const addUserToGroup = checkSchema({ userId: VALIDATION_SCHEMAS.USER_ID, groupId: VALIDATION_SCHEMAS.GROUP_ID });

const removeUserFromGroup = checkSchema({ userId: VALIDATION_SCHEMAS.USER_ID, groupId: VALIDATION_SCHEMAS.GROUP_ID });

const getGroupById = checkSchema({ id: VALIDATION_SCHEMAS.ID });

const deleteGroupById = checkSchema({ id: VALIDATION_SCHEMAS.ID });

const getAllGroups = checkSchema({
  'pagination.[limit]': VALIDATION_SCHEMAS.PAGINATIONS.limit,
  'pagination.[offset]': VALIDATION_SCHEMAS.PAGINATIONS.offset,
  'sort.[type]': VALIDATION_SCHEMAS.SORT.type,
  'sort.[field]': VALIDATION_SCHEMAS.SORT.field,
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
