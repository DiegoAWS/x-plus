
import { ExtraCronColumns, Template } from '../models/Template';
import { TemplateType } from '../../../../src/types/index';

// Create
export const createTemplate = async (template: TemplateType) => {

    const schedule = template?.schedule;
    const scheduleTime = new Date(template?.scheduleTime || Date.now());

    const cronFields: ExtraCronColumns = schedule && schedule !== 'once' ? {
        weekDay: scheduleTime.getDay(),
        monthDay: scheduleTime.getDate(),
        longHour: scheduleTime.getHours()
    } : {};

    const createdTemplate = await Template.create({
        ...template,
        ...cronFields
    });
    return createdTemplate.toJSON();
}

// Read by ID
export const getTemplateById = async (id: number,) => {
    const template = await Template.findByPk(id);

    if (!template) return null;
    return template.toJSON();

}

// Read all templates for a specific Client
export const getTemplatesByClientId = async (clientId: number) => {
    const templates = await Template.findAll({
        where: {
            clientId
        },
        order: [
            ['id', 'DESC']
        ]
    });
    return templates.map(template => template.toJSON());
}

// Update
export const updateTemplate = async (id: number, clientId: number, updatedTemplate: Partial<TemplateType>) => {
    await Template.update(updatedTemplate, {
        where: {
            id,
            clientId
        }
    });
    return getTemplateById(id);
}

// Delete
export const deleteTemplate = async (id: number, clientId: number) => {
    await Template.destroy({
        where: {
            id,
            clientId
        }
    });
}
