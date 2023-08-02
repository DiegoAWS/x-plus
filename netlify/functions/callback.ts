import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { User } from "./db/models/User";


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    console.log({ event, context })

    const users = await User.findAll();
    console.log({ users });

    return {
        statusCode: 200,
        body: JSON.stringify({users}),
      };
};

export { handler };