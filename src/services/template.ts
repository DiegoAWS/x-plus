import axios from "axios";

export type Template = {
    name: string;
    tweet: string;
}

export const createTemplate = async (data: Template) => {
    const response = await axios.post<Template>("/api/templates", data);
    return response.data;
}

export const getTemplates = async () => {
    const response = await axios.get<Template[]>("/api/templates");
    return response.data;
}