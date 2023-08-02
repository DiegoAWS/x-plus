import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { User } from "./db/models/User";


const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  const users = await User.findAll();
  console.log({ users });

  console.log({ event, context })
    return {
        statusCode: 200,
        body: JSON.stringify({users}),
      };
};

export { handler };