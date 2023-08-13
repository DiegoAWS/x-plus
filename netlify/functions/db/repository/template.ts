
import { Template, TemplateType } from '../models/Template';  // assuming the path, adjust if necessary

// Create
export const createTemplate = async (template: TemplateType) => {
    const createdTemplate = await Template.create(template);
    return createdTemplate.toJSON();
}

// Read by ID
export const getTemplateById = async (id: number) => {
    const template = await Template.findByPk(id);

    if (!template) return null;
    return template.toJSON();

}

// Read all templates for a specific Client
export const getTemplatesByClientId = async (clientId: number) => {
    const templates = await Template.findAll({
        where: {
            clientId
        }
    });
    return templates.map(template => template.toJSON());
}

// Update
export const updateTemplate = async (id: number,clientId: number, updatedTemplate: Partial<TemplateType>) => {
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
