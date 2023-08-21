import type { Handler } from "@netlify/functions";
import { User } from "./db/models/User";
import { Client } from "./db/models/Client";
import { Template } from "./db/models/Template";

const alter = false;
const force = false;
export const handler: Handler = async () => {
    await Client.sync({
        alter,
        force
    });
    await User.sync({
        alter,
        force
    });
    await Template.sync({
        alter,
        force
    });

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           synced: "true"
        })
    }
};