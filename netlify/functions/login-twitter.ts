import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { getTwitterOAuthToken, getTwitterUser } from "./services/twitter";
import { getClientModel } from "./db/models/Client";

// import { requestAccessToken } from "./services/twitter";
// import { Client, getClient } from "./db/models/Client";
// import { getUser } from "./db/models/User";
// import axios from "axios";


const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext) => {
  const user = context.clientContext?.user;
  const adminToken = context.clientContext?.identity?.token;



  console.log({ user, adminToken })
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "You must be signed in to call this function"
      })
    }
  }

  const { code, companyName } = JSON.parse(event?.body || "{}");
  console.log({ code, companyName })

  if (!code || !companyName) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required data { code, companyName }"
      })
    }
  }


  const token = await getTwitterOAuthToken(code);

  console.log({ token })

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Invalid code"
      })
    }
  }

  const twitterUser = await getTwitterUser(token.access_token);

  const tokenExpiresAt = (new Date(Date.now() + token.expires_in * 1000 - 60 * 1000)).toISOString();// 1 minute before expiration

  const Client = await getClientModel();

  const createdClient = await Client.create({
    name: companyName,
    twitterId: twitterUser?.id || "UKNOWN",
    twitterToken: token.access_token,
    twitterRefreshToken: token.refresh_token ,
    twitterTokenExpiresAt: tokenExpiresAt,
  });


  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      createdClient,
      user, adminToken,
      login: "ok"
    })
  }
};

export { handler };
