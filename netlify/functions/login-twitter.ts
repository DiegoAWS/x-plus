import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { TwitterUser, getTwitterOAuthToken, getTwitterUser } from "./services/twitter";

import { ROLE } from "./utils/types";
import { updateMetadataUser } from "./services/identity";
import { createClient, createUser } from "./db/repository/client";
import { createResponse } from "./utils/tools";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext) => {
  console.log({ value: 'Function start' });

  const user = context.clientContext?.user;
  const adminToken = context.clientContext?.identity?.token;

  console.log(event?.body)

  const { code, companyName, logo } = JSON.parse(event?.body || "{}");

  console.log({ code, companyName, logo, client: context.clientContext, user, adminToken })
  if (!code || !companyName) {
    console.log({ value: 'Missing data { code, companyName }' });
    return createResponse(400, {
      message: "Missing required data { code, companyName }"
    });
  }

  if (!user) {
    console.log({ value: 'User not signed in' });
    return createResponse(401, {
      message: "You must be signed in to call this function"
    });
  }

  const token = await getTwitterOAuthToken(code);

  if (!token) {
    console.log({ value: 'Invalid code' });
    return createResponse(400, {
      message: "Invalid code"
    });
  }

  let twitterUser = {
    id: "UNKNOWN",
  } as TwitterUser | null

  try {
    twitterUser = await getTwitterUser(token.access_token);
  }
  catch (e) {
    console.error("Error getting twitter user", e);
  }

  const tokenExpiresAt = (new Date(Date.now() + token.expires_in * 1000 - 60 * 1000)).toISOString();

  const createdClient = await createClient({
    name: companyName,
    logo,
    twitterId: twitterUser?.id || "UKNOWN",
    twitterToken: token.access_token,
    twitterRefreshToken: token.refresh_token,
    twitterTokenExpiresAt: tokenExpiresAt,
  });

  console.log({ value: 'Created client', createdClient });

  const createdUser = await createUser({
    email: user.email,
    role: ROLE.ADMIN,
    clientId: createdClient.id!,
  });

  console.log({ value: 'Created user', createdUser });

  const updatedIdentityUser = await updateMetadataUser(adminToken, user.sub, {
    userId: createdUser?.id?.toString() || "UNKNOWN",
    clientId: createdClient?.id?.toString() || "UNKNOWN",
    role: ROLE.ADMIN,
    companyName: createdClient.name,
    logo: createdClient.logo || "",
  });

  console.log({ value: 'Updated identity user', updatedIdentityUser });

  return createResponse(200, {
    token,
    updatedIdentityUser,
    createdClient,
    createdUser,
    user,
    adminToken,
    login: "ok"
  });
};

export { handler };
