import axios from "axios";
import { printError } from "../utils/tools";

// add your client id and secret here:
const TWITTER_OAUTH_CLIENT_ID = process.env.VITE_TWITTER_CLIENT_ID!;
const TWITTER_OAUTH_CLIENT_SECRET = process.env.VITE_TWITTER_CLIENT_SECRET!;
const TWITTER_OAUTH_CALLBACK = process.env.VITE_TWITTER_CALLBACK!;
const TWITTER_OAUTH_CHALLENGE = process.env.VITE_CODE_CHALLENGE!;

const TWITTER_OAUTH_TOKEN_URL = "https://api.twitter.com/2/oauth2/token";

const TWITTER_SEND_TWEET_URL = "https://api.twitter.com/2/tweets";

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
    refresh_token: string;
};

// the main step 1 function, getting the access token from twitter using the code that twitter sent us
export async function getTwitterOAuthToken(code: string) {

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
    ).catch(printError);

    return res?.data;

}

// the shape of the response we should get
export interface TwitterUser {
    id: string;
    name: string;
    username: string;
}

// getting the twitter user from access token
export async function getTwitterUser(accessToken: string): Promise<TwitterUser | null> {

    // request GET https://api.twitter.com/2/users/me
    const res = await axios.get<{ data: TwitterUser }>("https://api.twitter.com/2/users/me", {
        headers: {
            "Content-type": "application/json",
            // put the access token in the Authorization Bearer token
            Authorization: `Bearer ${accessToken}`,
        },
    }).catch(printError);

    return res?.data.data ?? null;

}

export async function refreshTwitterToken(refreshToken: string) {

    // POST request to the token url to get the access token
    const res = await axios.post<TwitterTokenResponse>(
        TWITTER_OAUTH_TOKEN_URL,
       {
            client_id: TWITTER_OAUTH_CLIENT_ID,
            grant_type: "refresh_token",
            refresh_token: refreshToken,

        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Basic ${BasicAuthToken}`,
            },
        }
    ).catch(printError);

    return res?.data;

}

export async function sendTweet(text, token) {

    // POST request to the token url to get the access token
    const res = await axios.post<TwitterTokenResponse>(
        TWITTER_SEND_TWEET_URL,
        {
            text
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    ).catch(printError);

    return res?.data;

}
