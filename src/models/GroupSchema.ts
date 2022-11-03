import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import UserGroup from './UserGroup';
import {User} from './UserSchema';

export class Group extends Model {
  declare id: number;
  declare description: string;
  declare name: string;
  declare status: string;
  declare priority: string;
  declare deadline: Date;
  declare ownerId: number;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
  },
  {
    tableName: 'groups',
    sequelize,
  },
);