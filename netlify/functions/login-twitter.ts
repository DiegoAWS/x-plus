import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";

import { requestAccessToken } from "./services/twitter";
import { Client, getClient } from "./db/models/Client";
import { getUser } from "./db/models/User";
import axios from "axios";


const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext) => {
  const user = context.clientContext?.user;
 
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "You must be signed in to call this function"
      })
    }
  }

  const { code, state, companyName } = JSON.parse(event?.body || "{}");

  if (!code || !state || state !== process.env.VITE_TWITTER_STATE || !companyName) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing required data { code, state, companyName }"
      })
    }
  }

  const { token, me } = await requestAccessToken(code);

  const Client = await getClient();

  const client = (await Client.create({
    name: me.data?.name || "",
    twitterId: me.data?.id || "",
    twitterToken: token?.access_token || "",
    twitterRefreshToken: token?.refresh_token || "",
    twitterTokenExpiresAt: token?.expires_at || "",
    companyName,
  })) as unknown as Client;

  const User = await getUser();

  const admin = await User.create({
    email: user.email || "",
    role: "admin",
    clientId: client.id
  })

  const updatedClient = await axios.put(`${process.env.VITE_API_URL}/admin/clients/${user.id}`, {
    app_metadata: {
      companyName,
      comppanyRole: "admin",
    }

  })



  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      admin,
      updatedClient,
      me,
      companyName,
      client
    })
  }
};

export { handler };
