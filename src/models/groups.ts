import { Schema, model, Types } from 'mongoose';


const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  discription: {
    type: String, 
    required: true
  },
  create: {
    type: Date, 
    default: Date.now,
    required: true
  },
  author: {
    type: Types.ObjectId,
    ref: 'User' 
  },
  users: [
    {
      type: Types.ObjectId,
      ref: 'User' 
    }
  ]
});

export const Group = model('Group', groupSchema);