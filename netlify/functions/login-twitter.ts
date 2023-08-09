import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { TwitterUser, getTwitterOAuthToken, getTwitterUser } from "./services/twitter";

import { ROLE } from "./utils/types";
import { updateMetadataUser } from "./services/identity";
import { createClient, createUser } from "./db/repository";

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

  let twitterUser = {
    id: "UNKNOWN",
  } as TwitterUser| null
  
  try {
    twitterUser = await getTwitterUser(token.access_token);
  }
  catch (err) {
    console.error(err);
  }

  const tokenExpiresAt = (new Date(Date.now() + token.expires_in * 1000 - 60 * 1000)).toISOString();// 1 minute before expiration


  const createdClient = await createClient({
    name: companyName,
    twitterId: twitterUser?.id || "UKNOWN",
    twitterToken: token.access_token,
    twitterRefreshToken: token.refresh_token,
    twitterTokenExpiresAt: tokenExpiresAt,
  });



  const createdUser = await createUser({
    email: user.email,
    role: ROLE.ADMIN,
    clientId: createdClient.id!,

  })

  console.log({ createdUser })


  const updatedIdentityUser = await updateMetadataUser(adminToken,user.sub,{
    userId: createdUser?.id?.toString() || "UNKNOWN",
    role: ROLE.ADMIN,
    clienName: createdClient.name,
  })


  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token,
      updatedIdentityUser,
      createdClient,
      createdUser,
      user, adminToken,
      login: "ok"
    })
  }
};

export { handler };
