import { Sequelize } from "sequelize";
import mysql from "mysql2";

export const sequelize = new Sequelize(
    process.env.DB_NAME || "mysql",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "root",
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectModule: mysql
    }

);