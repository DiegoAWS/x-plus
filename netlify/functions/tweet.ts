import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { getClientById, updateClient } from "./db/repository/client";
import { refreshTwitterToken, sendTweet } from "./services/twitter";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const {tweet} = JSON.parse(event?.body || "{}");

    console.log({ tweet })
    const user = context?.clientContext?.user;

    if (!user) {
        return {
            statusCode: 401,
            body: "Unauthorized"
        };
    }


    const client = await getClientById(user?.app_metadata?.clientId);
    const tokenExpireAt = client?.twitterTokenExpiresAt;

    const isTokenValid = tokenExpireAt && new Date(tokenExpireAt) < new Date();

    console.log({isTokenValid, tokenExpireAt, now: new Date()})
    let access_token = client?.twitterToken || "";

    if (!isTokenValid) {
        const refreshToken = client?.twitterRefreshToken || "";

        const updatedToken = await refreshTwitterToken(refreshToken);

        console.log({ updatedToken })
        const updatedClient = await updateClient(client?.id || 0, {
            twitterToken: updatedToken?.access_token || "",
            twitterRefreshToken: updatedToken?.refresh_token || "",
            twitterTokenExpiresAt: (new Date(Date.now() + (updatedToken?.expires_in || 2 * 1000) * 1000 - 60 * 1000)).toISOString(),
        })
        console.log({ updatedClient })
        access_token = updatedToken?.access_token || "";
    }

    console.log({ access_token })



    const responseTweet = await sendTweet(tweet, access_token);
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client,
            isTokenValid,
            responseTweet
        })
    }
};

export { handler };
