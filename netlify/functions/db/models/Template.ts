import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { DefaulColumns } from "../../utils/types";
import { TemplateType } from "../../../../src/types/index"

export type ExtraCronColumns = {
    weekDay?: number;
    monthDay?: number;
    longHour?: number;
}

export type FullTemplate = TemplateType & DefaulColumns & ExtraCronColumns;

export const Template = sequelize.define<Model<FullTemplate>>('Template', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
    },
    tweet: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    schedule: {
        type: DataTypes.TEXT,
    },
    scheduleTime: {
        type: DataTypes.TEXT,
    },

    weekDay: {
        type: DataTypes.INTEGER,
    },
    monthDay: {
        type: DataTypes.INTEGER,
    },
    longHour: {
        type: DataTypes.INTEGER,
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
