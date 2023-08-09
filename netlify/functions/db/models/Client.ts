import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { DefaulColumns } from "../../utils/types";
import { getUserModel } from "./User";

export type Client = {
    name: string;
    twitterId: string;
    twitterToken: string;
    twitterRefreshToken: string;
    twitterTokenExpiresAt: string;
}

// type FullClient  is Client plus fields in   DefaulColumns;
export type FullClient = Client & DefaulColumns;


export const getClientModel = async () => {

    const client = sequelize.define<Model<FullClient>>('Client', {
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

    // One client has many users
    const userModel = await getUserModel();

    client.hasMany(userModel);

    await sequelize.sync({
        alter: true,
    });

    return client;
}

