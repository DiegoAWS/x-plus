import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { DefaulColumns } from "../../utils/types";


export type TemplateType = {
    name: string;
    tweet: string;
    clientId: number;  // Foreign Key to represent association with Client
}


export type FullTemplate = TemplateType & DefaulColumns;

export const Template = sequelize.define<Model<FullTemplate>>('Template', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tweet: {
        type: DataTypes.TEXT,
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
