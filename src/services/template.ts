import axios from "axios";
import type { TemplateType } from "../types";

// Create a new template
export const createTemplate = async (data: TemplateType) => {
    const response = await axios.post<TemplateType>("/.netlify/functions/templates", data);
    return response.data;
}

// Get all templates (you might adjust this if you specifically need to get all templates by a client ID)
export const getTemplates = async () => {
    const response = await axios.get<TemplateType[]>("/.netlify/functions/templates");
    return response.data;
}


// Update a template by its ID
export const updateTemplate = async (data: TemplateType) => {
    const response = await axios.patch<TemplateType>(`/.netlify/functions/templates`, data);
    return response.data;
}

// Delete a template by its ID
export const deleteTemplate = async (id: number) => {
    await axios.delete(`/.netlify/functions/templates?id=${id}`);
}
