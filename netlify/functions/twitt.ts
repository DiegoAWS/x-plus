import type { Handler, HandlerEvent } from "@netlify/functions";
import { authTwitter } from "./services/authTwitter";

const handler: Handler = async (event: HandlerEvent) => {
  const { code, state, text } = JSON.parse(event?.body || "{}");

  if (!code || !state) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing code or state"
      })
    }
  }

  const { publishTweet, token } = await authTwitter({
    authResponse: {
      code,
      state
    }
  });

  const tweet = await publishTweet(text);


  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      tweet,
      token
    })
  }
};

export { handler };
