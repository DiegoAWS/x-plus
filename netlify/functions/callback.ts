import type { Handler, HandlerEvent } from "@netlify/functions";
import { authClient } from "./services/auth";

const handler: Handler = async (event: HandlerEvent) => {

  try {
    const { code, state } = event?.queryStringParameters || {};

    if (!code || state !== process.env.TWITTER_STATE) {
      console.log({ code, state, env: process.env.TWITTER_STATE })
      throw new Error("State isn't matching");
    }

    console.log({ code });

    await authClient.requestAccessToken(code as string);

  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ error })
    }
  }

  // redirect to /
  return {
    statusCode: 302,
    headers: {
      Location: "/",
    }
  }
};

export { handler };
