import type { Handler } from "@netlify/functions";

import { getUser } from "./db/models/User";
import { getClient } from "./db/models/Client";

const handler: Handler = async () => {

    const User = await getUser();
    const users = await User.findAll();

    const Client = await getClient();
    const clients = await Client.findAll();





    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "OK",
            users,
            clients
        })
    }
};

export { handler };
