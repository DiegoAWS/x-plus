import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";

import { requestAccessToken } from "./services/twitter";
import { Client, getClient } from "./db/models/Client";
import { getUser } from "./db/models/User";
import axios from "axios";


const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext) => {
  const user = context.clientContext?.user;
  let adminToken = context.clientContext?.identity?.token;


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

  console.log({ token, me })

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

  const userToInsert = {
    email: user.email || "",
    role: "admin",
    clientId: client.id
  }



  const [admin] = await User.findOrCreate({

    where: {
      email: user.email || "",
    },
    defaults: userToInsert
  })


  // HARDCODED FOR TESTING
  if (!adminToken) {
    adminToken = (await axios.get("https://x-plus.netlify.app/.netlify/functions/token"))?.data?.access_token
  }


  console.log({ adminToken })

  const justCreated = admin.get({
    plain: true
  })
  console.log({ justCreated })
  const url = `https://x-plus.netlify.app/.netlify/identity/admin/users/${user?.sub}`
  const body = {
    app_metadata: {
      companyName,
      companyId: justCreated.clientId,
      userId: justCreated.id,
      companyRole: "admin",
      
    }
  }

  const params = {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      Accept: "application/json",
    }
  }
  console.log({user})

  console.log({ url, body, params, verb: "PUT" })

  const updatedClient = await axios.put(url, body, params)



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
