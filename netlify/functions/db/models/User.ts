import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { DefaulColumns } from "../../utils/types";

export type UserType = {
  email: string;
  role: string;
  clientId?: number;
}

export type FullUser = UserType & DefaulColumns;


export const User = sequelize.define<Model<FullUser>>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clients',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
  

});
