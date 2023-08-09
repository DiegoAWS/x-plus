import { DataTypes } from "sequelize";
import { sequelize } from "../connection";

export const getClient = async () => {

    const client = sequelize.define('Client', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        twitterId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        twitterToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        twitterRefreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        twitterTokenExpiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    await sequelize.sync({
        alter: true,
    });

    return client;
}

export type Client = {
    id: number;
    name: string;
    twitterId: string;
    twitterToken: string;
    twitterRefreshToken: string;
    twitterTokenExpiresAt: string;
    updatedAt: string;
    createdAt: string;
}
