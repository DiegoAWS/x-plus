import { Client, auth } from "twitter-api-sdk";
import { OAuth2UserOptions } from "twitter-api-sdk/dist/OAuth2User";

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
    scopes: ["tweet.read", "users.read", "tweet.write", "offline.access"],
    token
  })


  function getAuthUrl() {
    return authClient.generateAuthURL({
      state: process.env.TWITTER_STATE || "",
      code_challenge: process.env.TWITTER_STATE || "",
      code_challenge_method: "plain"
    });
  }

  if (code && state === process.env.TWITTER_STATE) {
    getAuthUrl();
    token = (await authClient.requestAccessToken(code as string))?.token;
  }

  const client = new Client(authClient);

  function logout() {
    return authClient.revokeAccessToken();
  }

  function getMe() {
    return client.users.findMyUser();
  }


  return {
    authClient,
    client,
    token,
    getAuthUrl,
    logout,
    getMe
  }
}