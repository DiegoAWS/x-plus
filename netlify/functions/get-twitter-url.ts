
import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { generateAuthUrl } from "./services/twitter";

const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext) => {
    const user = context.clientContext?.user;
    if (!user) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "You must be signed in to call this function"
            })
        }
    }

    const {authUrl} = await generateAuthUrl()

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ authUrl }),
    }
};

export { handler };
