import type { Handler, HandlerEvent } from "@netlify/functions";
import { authTwitter } from "./services/authTwitter";

const handler: Handler = async (event: HandlerEvent) => {

    const { code, state } = event?.queryStringParameters || {};

  if (!code || !state) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing code or state"
      })
    }
    }

  const { token } = await authTwitter({
    authResponse: {
      code,
      state
    }
  });

  // encode token to string and to base64
  const encoded = Buffer.from(JSON.stringify(token)).toString("base64");


    return {
      statusCode: 200,
      headers:{
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
        message: "Logged in",
        token,
        encoded

      })
    }
};

export { handler };
