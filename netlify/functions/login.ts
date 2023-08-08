import type { Handler, HandlerEvent } from "@netlify/functions";
import { authTwitter } from "./services/authTwitter";

const handler: Handler = async (event: HandlerEvent) => {
  const { code, state } = JSON.parse(event?.body || "{}");

  if (!code || !state) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing code or state"
      })
    }
  }

  const { token, getMe } = await authTwitter({
    authResponse: {
      code,
      state
    }
  });

  const me = await getMe();



  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      me
    })
  }
};

export { handler };
