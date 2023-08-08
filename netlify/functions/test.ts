import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from "axios";
// import { getUser } from "./db/models/User";
// import { getClient } from "./db/models/Client";


export const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext
) => {

    const userContext = context.clientContext;
    if (!userContext) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: "Unauthorized"
            })
        }
    }


    try {
        const clientToken = context.clientContext?.identity;

        const user = userContext?.user;

        const { identity } = context.clientContext as NonNullable<HandlerContext["clientContext"]>;

        const url = `${process.env.URL}/.netlify/identity/user/`;
        const body = {
            data: {
                "test": "test"
            }
        };
        const headers = {
            Authorization: `Bearer ${identity.token}`
        }

        const updatedUser = await axios.put(url,
            body, {
            headers
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
                updatedUser,
                url,
                clientToken,
                body,
                headers,
            })
        }

    } catch (error) {

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.toString() || "Internal Server Error"
            })
        }
    }
};