import type { Handler, HandlerEvent } from "@netlify/functions";
import { authClient } from "./services/auth";

const handler: Handler = async (event: HandlerEvent) => {

  try {
    const { code, state } = event?.queryStringParameters || {};

    if (!code || state !== process.env.TWITTER_STATE) {

      throw new Error("State isn't matching" + JSON.stringify({ code, state }));
    }

    authClient.generateAuthURL({
      state: process.env.TWITTER_STATE || "",
      code_challenge: process.env.TWITTER_STATE || "",
      code_challenge_method: "plain"
    });


    const token = await authClient.requestAccessToken(code as string);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Logged in", token,
        expire: new Date(token?.token?.expires_at as number).toLocaleString()

      })
    }

  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ error })
    }
  }

  // redirect to /

};

export { handler };
