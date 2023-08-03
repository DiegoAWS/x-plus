import { Client, auth } from "twitter-api-sdk";

export const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID as string,
  client_secret: process.env.TWITTER_CLIENT_SECRET as string,
  callback: process.env.TWITTER_CALLBACK as string,
  scopes: ["tweet.read", "users.read", "tweet.write", "offline.access"],
});

export const client = new Client(authClient);

