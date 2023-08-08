import { Handler } from "@netlify/functions";
import { getUser } from "./db/models/User";
import { getClient } from "./db/models/Client";


export const handler: Handler = async () => {

    const Client = await getClient();

    const clients = await Client.findAll();
    const User = await getUser();

    const users = await User.findAll();
   
   

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Synced DBs successfully",
            users,
            clients
        })
    }
};