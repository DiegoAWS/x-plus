import type { Handler } from "@netlify/functions";
import { User } from "./db/models/User";
import { Client } from "./db/models/Client";

export const handler: Handler = async () => {
    await Client.sync();
    await User.sync();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           synced: true
        })
    }
};