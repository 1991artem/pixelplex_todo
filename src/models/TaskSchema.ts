import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import {User} from './UserSchema';

export class Task extends Model {
  declare id: number;
  declare description: string;
  declare name: string;
  declare status: string;
  declare priority: string;
  declare deadline: Date;
  declare ownerId: number;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING, 
      defaultValue: "to do"
    },
    deadline: {
      type: DataTypes.DATE
    },
    priority: {
      type: DataTypes.STRING, 
      defaultValue: "high"
    },
    ownerId: {
      type: DataTypes.INTEGER
    }
  },
  {
    tableName: 'tasks',
    sequelize,
  },
);

Task.belongsTo(User)

export default Task;