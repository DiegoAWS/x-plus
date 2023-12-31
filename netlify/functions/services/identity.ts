import axios from "axios"
import { printError } from "../utils/tools";
const identityUrl = "https://x-plus.netlify.app/.netlify/identity/admin/users/";

export const updateMetadataUser = async (accessToken: string,id: string, fields: Record<string, string>) => {
    const response = await axios.put(identityUrl+id, {
        app_metadata: fields
    },{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    }).catch(printError);

    return response?.data;
}