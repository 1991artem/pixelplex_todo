
import { Schema, model, Types } from 'mongoose';
import { ITask } from '../helps/interfaces';

const taskSchema = new Schema<ITask>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    default: Date.now,
    required: true,
  },
  priority: {
    type: String,
    default: 'high',
    required: true,
  },
  status: {
    type: String,
    default: 'to do',
    required: true,
  },
  done: {
    type: Date
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const Task = model('Task', taskSchema, 'task');
