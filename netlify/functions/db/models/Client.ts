import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { DefaulColumns } from "../../utils/types";

export type ClientType = {
    name: string;
    logo?: string;
    twitterId: string;
    twitterToken: string;
    twitterRefreshToken: string;
    twitterTokenExpiresAt: string;
}

// type FullClient  is Client plus fields in   DefaulColumns;
export type FullClient = ClientType & DefaulColumns;

export const Client = sequelize.define<Model<FullClient>>('Client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logo:{
        type: DataTypes.STRING,
        allowNull: true,
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

