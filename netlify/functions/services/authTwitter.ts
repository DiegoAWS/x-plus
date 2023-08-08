import { Client, auth } from "twitter-api-sdk";
import { OAuth2UserOptions } from "twitter-api-sdk/dist/OAuth2User";
import { scopes } from "../utils/constants";

export type AuthResponse = {
  code: string;
  state: string;
}

export type AuthToken = OAuth2UserOptions["token"]

type Props = {
  authResponse?: AuthResponse;
  token?: AuthToken;
} | void;

export async function authTwitter(props: Props) {
  const { authResponse } = props || {};
  const { code, state } = authResponse || {};
  let { token } = props || {};

  const authClient = new auth.OAuth2User({
    client_id: process.env.TWITTER_CLIENT_ID as string,
    client_secret: process.env.TWITTER_CLIENT_SECRET as string,
    callback: process.env.TWITTER_CALLBACK as string,
    scopes,
    token
  })

  if (token?.expires_at && token?.expires_at < Date.now()) {
    token = (await authClient.refreshAccessToken())?.token;
  }


  function getAuthUrl() {
    return authClient.generateAuthURL({
      state: process.env.VITE_TWITTER_STATE || "",
      code_challenge: process.env.VITE_TWITTER_STATE || "",
      code_challenge_method: "plain"
    });
  }

  if (code && state === process.env.VITE_TWITTER_STATE) {
    getAuthUrl();
    token = (await authClient.requestAccessToken(code as string))?.token;
  }

  const client = new Client(authClient);

  function logout() {
    if (authClient?.token)
      return authClient.revokeAccessToken();
  }

  function getMe() {
    if (authClient?.token)
      return client.users.findMyUser();
  }

  function publishTweet(text: string) {
    if (authClient?.token)
      return client.tweets.createTweet({
        text
      })
  }

  function deleteTweet(id: string) {
    if (authClient?.token)
      return client.tweets.deleteTweetById(id)
  }


  return {
    authClient,
    client,
    token,
    getAuthUrl,
    logout,
    getMe,
    publishTweet,
    deleteTweet
  }
}