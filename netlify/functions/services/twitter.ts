import axios from "axios";

// add your client id and secret here:
const TWITTER_OAUTH_CLIENT_ID = process.env.VITE_TWITTER_CLIENT_ID !;
const TWITTER_OAUTH_CLIENT_SECRET = process.env.VITE_TWITTER_CLIENT_SECRET !;
const TWITTER_OAUTH_CALLBACK = process.env.VITE_TWITTER_CALLBACK !;
const TWITTER_OAUTH_CHALLENGE= process.env.VITE_CODE_CHALLENGE !;

const TWITTER_OAUTH_TOKEN_URL = "https://api.twitter.com/2/oauth2/token";

// we need to encrypt our twitter client id and secret here in base 64 (stated in twitter documentation)
const BasicAuthToken = Buffer.from(`${TWITTER_OAUTH_CLIENT_ID}:${TWITTER_OAUTH_CLIENT_SECRET}`, "utf8").toString(
  "base64"
);

// filling up the query parameters needed to request for getting the token
export const twitterOauthTokenParams = {
  client_id: TWITTER_OAUTH_CLIENT_ID,
  code_verifier: TWITTER_OAUTH_CHALLENGE,
  redirect_uri: TWITTER_OAUTH_CALLBACK,
  grant_type: "authorization_code",
};

// the shape of the object we should recieve from twitter in the request
type TwitterTokenResponse = {
  token_type: "bearer";
  expires_in: 7200;
  access_token: string;
  scope: string;
};

// the main step 1 function, getting the access token from twitter using the code that twitter sent us
export async function getTwitterOAuthToken(code: string) {
  try {
    // POST request to the token url to get the access token
    const res = await axios.post<TwitterTokenResponse>(
      TWITTER_OAUTH_TOKEN_URL,
      new URLSearchParams({ ...twitterOauthTokenParams, code }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${BasicAuthToken}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error(err);

    return null;
  }
}
