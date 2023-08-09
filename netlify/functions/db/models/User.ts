import { DataTypes } from "sequelize";
import { sequelize } from "../connection";


export const getUser = async () => {

  const user = sequelize.define('User', {
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
