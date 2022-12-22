import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

const createTask = checkSchema({ ...VALIDATION_SCHEMAS.TASK });

const updateTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID, ...VALIDATION_SCHEMAS.TASK });

const getTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID });

const deleteTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID });

const getAllTasks = checkSchema({
  'pagination.[limit]': VALIDATION_SCHEMAS.LIMIT,
  'pagination.[offset]': VALIDATION_SCHEMAS.OFFSET,
  'sort.[type]': VALIDATION_SCHEMAS.TYPE,
  'sort.[field]': VALIDATION_SCHEMAS.FIELD,
  'filter.[user]': VALIDATION_SCHEMAS.USER_ID,
  includeGroupmatesTasks: VALIDATION_SCHEMAS.INCLUDE_GROUPMATES_TASKS,
});

export {
  createTask,
  updateTaskById,
  getAllTasks,
  getTaskById,
  deleteTaskById,
};
