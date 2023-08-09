import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { DefaulColumns } from "./types";

export type User = {
  email: string;
  role: string;
  clientId: number;
}

export type FullUser = User & DefaulColumns;

export const getUserModel = async () => {

  const user = sequelize.define<Model<FullUser>>('User', {
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
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      }
    }

  }, {

  });

  await sequelize.sync({
    alter: true,
  });

  return user;
}
