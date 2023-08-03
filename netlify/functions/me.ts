
import type { Handler } from "@netlify/functions";

import { Client, auth } from "twitter-api-sdk";

const handler: Handler = async () => {


    const authClient = new auth.OAuth2User({
        client_id: process.env.TWITTER_CLIENT_ID as string,
        client_secret: process.env.TWITTER_CLIENT_SECRET as string,
        callback: process.env.TWITTER_CALLBACK as string,
        scopes: ["tweet.read", "users.read", "tweet.write", "offline.access"],
        "token": {
            "token_type": "bearer",
            "access_token": "ZFQ2NlV1V2JfSzNidjJld0NaVFdHTUF0V01XTWo0WXN6Tm1fSC12UGxaZm9JOjE2OTEwMjMyMTQyMDg6MTowOmF0OjE",
            "scope": "tweet.write users.read tweet.read offline.access",
            "refresh_token": "T2NWX2tfTlE3Qm9UOUI2VWFTc01KME8yaE00SUhfbmxRSUtDRldCQVBHNVJaOjE2OTEwMjMyMTQyMDg6MToxOnJ0OjE",
            "expires_at": 1691030414326
        }
    });

    const token = await authClient.refreshAccessToken();

    const client = new Client(authClient);

    const me = await client.users.findMyUser();

    // redirect to authUrl
    return {
        statusCode: 200,
        body: JSON.stringify({ me, token })
    }
};

export { handler };
