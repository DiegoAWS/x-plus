import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { 
    createTemplate,
    getTemplateById,
    getTemplatesByClientId,
    updateTemplate,
    deleteTemplate
 } from "./db/repository/template";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const user = context?.clientContext?.user;
    if (!user) {
        return {
            statusCode: 401,
            body: "Unauthorized"
        };
    }

    const requestBody = JSON.parse(event?.body || "{}");

    const method = event?.httpMethod;
    const clientId = user?.app_metadata?.clientId;

    if (!clientId) {
        return {
            statusCode: 400,
            body: "Bad Request"
        };
    }

    // use clientId to only get/operate on the templates of this client
    switch (method) {
        case "POST": {
            const newTemplate = await createTemplate({
                ...requestBody,
                clientId
            });
            return {
                statusCode: 201,
                body: JSON.stringify(newTemplate)
            };
        }
    
        case "GET": {
            if (requestBody.id) {
                // fetch a single template by its id
                const template = await getTemplateById(requestBody.id);
                return {
                    statusCode: 200,
                    body: JSON.stringify(template)
                };
            } else {
                // fetch all templates for this client
                const templates = await getTemplatesByClientId(clientId);
                return {
                    statusCode: 200,
                    body: JSON.stringify(templates)
                };
            }
        }
    
        case "PATCH": {
            if (requestBody.id) {
                // update a template
                const updated = await updateTemplate(requestBody.id, clientId, requestBody);
                return {
                    statusCode: 200,
                    body: JSON.stringify(updated)
                };
            } else {
                return {
                    statusCode: 400,
                    body: "Template ID is required for updating"
                };
            }
        }
    
        case "DELETE": {
            if (requestBody.id) {
                // delete a template
                await deleteTemplate(requestBody.id, clientId);
                return {
                    statusCode: 204,
                    body: ''
                };
            } else {
                return {
                    statusCode: 400,
                    body: "Template ID is required for deletion"
                };
            }
        }
    
        default: {
            return {
                statusCode: 405,
                body: "Method Not Allowed"
            };
        }
    }
    
    
};

export { handler };
