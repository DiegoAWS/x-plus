import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

import { getUser } from "./db/models/User";


export const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext
) => {

    const User = await getUser();

    const test= await User.sync();


    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: context.clientContext?.identity?.token, test })
    }


};