import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";
// import { getUser } from "./db/models/User";
// import { getClient } from "./db/models/Client";


export const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext
) => {

    const user = context.clientContext;
    if(!user) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Unauthorized"
            })
        }
    }

    try {
        
 

    const { identity } = context.clientContext as NonNullable<HandlerContext["clientContext"]>;

    const updatedUser = axios.put(`${process.env.URL}/.netlify/identity/user`, {
        ...user,
        user_metadata: {
            ...user.user_metadata,
            ...(event.body ? JSON.parse(event.body) : {})
        }
    }, {
        headers: {
            Authorization: `Bearer ${identity.token}`
        }
    });


    // const Client = await getClient();

    // const clients = await Client.findAll();
    // const User = await getUser();

    // const users = await User.findAll();



    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "OK",
            user,
            updatedUser
        })
    }

} catch (error) {
 
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: error.message || error.toString() || "Internal Server Error"
        })
    }
}
};