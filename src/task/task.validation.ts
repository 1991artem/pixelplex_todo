import { checkSchema } from 'express-validator';
import { task, id, paginations } from './constants';

const createTask = checkSchema({ ...task });

const updateTaskById = checkSchema({ id, ...task });

const getTaskById = checkSchema({ id });

const deleteTaskById = checkSchema({ id });

const getAllTasks = checkSchema({
  'pagination.[limit]': paginations.limit,
  'pagination.[offset]': paginations.offset,
  'sort.[type]': paginations.type,
  'sort.[field]': paginations.field,
});

export {
  createTask,
  updateTaskById,
  getAllTasks,
  getTaskById,
  deleteTaskById,
};
