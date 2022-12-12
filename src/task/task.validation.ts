import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

const createTask = checkSchema({ ...VALIDATION_SCHEMAS.TASK });

const updateTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID, ...VALIDATION_SCHEMAS.TASK });

const getTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID });

const deleteTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID });

const getAllTasks = checkSchema({
  'pagination.[limit]': VALIDATION_SCHEMAS.PAGINATIONS.limit,
  'pagination.[offset]': VALIDATION_SCHEMAS.PAGINATIONS.offset,
  'sort.[type]': VALIDATION_SCHEMAS.PAGINATIONS.type,
  'sort.[field]': VALIDATION_SCHEMAS.PAGINATIONS.field,
  'filter.[user]': VALIDATION_SCHEMAS.USER_ID,
});

export {
  createTask,
  updateTaskById,
  getAllTasks,
  getTaskById,
  deleteTaskById,
};
