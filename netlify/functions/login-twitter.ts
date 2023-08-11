import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { TwitterUser, getTwitterOAuthToken, getTwitterUser } from "./services/twitter";

import { ROLE } from "./utils/types";
import { updateMetadataUser } from "./services/identity";
import { createClient, createUser } from "./db/repository";
import { createResponse } from "./utils/tools";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext) => {
  const user = context.clientContext?.user;
  const adminToken = context.clientContext?.identity?.token;

  const { code, companyName } = JSON.parse(event?.body || "{}");

  if (!code || !companyName) {
    return createResponse(400, {
      message: "Missing required data { code, companyName }"
    })
  }

  if (!user) {
    return createResponse(401, {
      message: "You must be signed in to call this function"
    })
  }


  const token = await getTwitterOAuthToken(code);


  if (!token) {
    return createResponse(400, {
      message: "Invalid code"
    })
  }

  let twitterUser = {
    id: "UNKNOWN",
  } as TwitterUser | null

  try {
    twitterUser = await getTwitterUser(token.access_token);
  }
  catch (e) {
    console.error("Error getting twitter user")
  }

  const tokenExpiresAt = (new Date(Date.now() + token.expires_in * 1000 - 60 * 1000)).toISOString(); // 1 minute before real expiration

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

  const updatedIdentityUser = await updateMetadataUser(adminToken, user.sub, {
    userId: createdUser?.id?.toString() || "UNKNOWN",
    role: ROLE.ADMIN,
    companyName: createdClient.name,
  })

  return createResponse(200, {
    token,
    updatedIdentityUser,
    createdClient,
    createdUser,
    user,
    adminToken,
    login: "ok"
  })
};

export { handler };
