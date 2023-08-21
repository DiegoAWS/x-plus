import type { Handler } from "@netlify/functions";
import { User } from "./db/models/User";
import { Client } from "./db/models/Client";
import { Template } from "./db/models/Template";

export const handler: Handler = async () => {
    await Client.sync({
        // alter: true,
        force: true
    });
    await User.sync({
        // alter: true,
        force: true
    });
    await Template.sync({
        // alter: true,
        force: true
    });

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