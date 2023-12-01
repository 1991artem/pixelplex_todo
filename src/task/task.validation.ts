import { checkSchema } from 'express-validator';
import * as VALIDATION_SCHEMAS from './constants/validation.constants';

const createTask = checkSchema({ name: VALIDATION_SCHEMAS.NAME, priority: VALIDATION_SCHEMAS.PRIORITY, status: VALIDATION_SCHEMAS.STATUS, deadline: VALIDATION_SCHEMAS.DEADLINE, description: VALIDATION_SCHEMAS.DESCRIPTION });

const updateTaskById = checkSchema({ id: VALIDATION_SCHEMAS.ID, name: VALIDATION_SCHEMAS.NAME, priority: VALIDATION_SCHEMAS.PRIORITY, status: VALIDATION_SCHEMAS.STATUS, deadline: VALIDATION_SCHEMAS.DEADLINE });

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
