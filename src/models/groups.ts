import { Schema, model, Types } from 'mongoose';
import { IGroup } from '../helps/interfaces';


const groupSchema = new Schema<IGroup>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  create: {
    type: Date, 
    default: Date.now,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

export const Group = model('Group', groupSchema, 'group');