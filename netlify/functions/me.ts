
import type { Handler } from "@netlify/functions";
import {  client } from "./services/auth";

const handler: Handler = async () => {

    const me = await client.users.findMyUser();

    // redirect to authUrl
    return {
        statusCode: 200,
        body: JSON.stringify(me)
    }
};

export { handler };
