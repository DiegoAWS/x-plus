import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";



export const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext
) => {

const access_token = context.clientContext?.identity?.token;
    
const decoded = JSON.parse(Buffer.from(access_token.split(".")[1], "base64").toString("utf-8"));

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            test:"auth",
            access_token,
            refresh_token: access_token,
            expires_at: decoded.exp,
        })
    }
};