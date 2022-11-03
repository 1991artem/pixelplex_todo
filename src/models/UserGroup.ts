import { DataTypes } from "sequelize";
import sequelize from "../db";
import {Group} from "./GroupSchema";
import {User} from "./UserSchema";

export const UserGroup = sequelize.define('user_group', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  GroupId: {
    type: DataTypes.INTEGER,
    references: {
      model: Group,
      key: 'id'
    }
  }
})

export default UserGroup;