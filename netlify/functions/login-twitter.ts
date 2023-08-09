import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { getTwitterOAuthToken } from "./services/twitter";

// import { requestAccessToken } from "./services/twitter";
// import { Client, getClient } from "./db/models/Client";
// import { getUser } from "./db/models/User";
// import axios from "axios";


const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext) => {
  const user = context.clientContext?.user;
  const adminToken = context.clientContext?.identity?.token;


  console.log({ user })
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "You must be signed in to call this function"
      })
    }
  }

  const { code, state, companyName } = JSON.parse(event?.body || "{}");
  console.log({ code, state, companyName })

  if (!code || !state || !companyName || (state !== process.env.VITE_TWITTER_STATE)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required data { code, state, companyName }"
      })
    }
  }


  const token = await getTwitterOAuthToken(code);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      // admin,
      // updatedClient,
      // me,
      // companyName,
      // client
      user, adminToken,
      login: "ok"
    })
  }
};

export { handler };
