import { DataTypes } from "sequelize";
import { sequelize } from "../connection";

export const User = sequelize.define('User', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  twitterId: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  }
}, {

});

sequelize.sync({
  force: true
}).then(() => {
  console.log('Users table synced');
})