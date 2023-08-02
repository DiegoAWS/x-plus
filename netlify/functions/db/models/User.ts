import { DataTypes } from "sequelize";
import { sequelize } from "../connection";

export const User = sequelize.define('User', {
  // Model attributes are defined here
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {

});

sequelize.sync().then(() => {
  console.log('Users table synced');
})