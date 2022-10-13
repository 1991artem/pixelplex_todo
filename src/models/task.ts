
import { Schema, model, Types } from 'mongoose';

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  discription: {
    type: String, 
    required: true
  },
  deadline: {
    type: Date, 
    default: Date.now,
    required: true
  },
  priority: {
    type: Boolean,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User'
  }
});

export const Task = model('Task', taskSchema);