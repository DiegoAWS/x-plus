import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { getUploadUrl } from "./services/s3Client"

export const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext
) => {
    try {
        //Check auth from user context
        const user = context.clientContext?.user;
        if (!user) {
            return {
                statusCode: 401,
                body: "You must be signed in to call this function"
            }
        }


        const extension = event.queryStringParameters?.extension;

        if (!extension) {
            return {
                statusCode: 400,
                body: "Missing query param 'extension'"
            }
        }

        const uploadUrl = await getUploadUrl(extension);

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uploadUrl })
        }
    } catch (error) {
        return {
            statusCode: 400,
            body: `Failed to parse form data: ${error.message}`,
        };
    }


};
