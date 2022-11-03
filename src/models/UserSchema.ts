import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { Group } from "./GroupSchema";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare password: string;
  declare email: string;
  declare role: string;
}

User.init(
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
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    role: {
      type: DataTypes.STRING, 
      defaultValue: "USER"
    },
  },
  {
    tableName: 'users',
    sequelize,
  },
);

User.belongsToMany(Group, {
  through: 'UserGroup',
  foreignKey: 'userId',
  otherKey: 'groupId'  
})

Group.belongsToMany(User, {
  through: 'UserGroup',
  foreignKey: 'groupId',
  otherKey: 'userId' 
})