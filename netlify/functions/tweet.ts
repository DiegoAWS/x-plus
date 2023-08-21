import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { getClientById, updateClient } from "./db/repository/client";
import { refreshTwitterToken, sendTweet } from "./services/twitter";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const { tweet } = JSON.parse(event?.body || "{}");


    const user = context?.clientContext?.user;
    const clientId = user?.app_metadata?.clientId;

    if (!user || !clientId) {
        return {
            statusCode: 401,
            body: "Unauthorized"
        };
    }


    const client = await getClientById(clientId);
    if (!client) {
        return {
            statusCode: 404,
            body: "Client not found"
        };
    }
    // console.log(client)
    const tokenExpireAt = client?.twitterTokenExpiresAt;

    const isTokenValid = tokenExpireAt && (Date.now() < new Date(tokenExpireAt).getTime());


    let access_token = client?.twitterToken || "";


    if (!isTokenValid) {

        const refreshToken = client?.twitterRefreshToken || "";

        const updatedToken = await refreshTwitterToken(refreshToken);

        if (!updatedToken) {
            return {
                statusCode: 500,
                body: "Error refreshing token"
            };
        }

        await updateClient(client?.id || 0, {
            twitterToken: updatedToken?.access_token || "",
            twitterRefreshToken: updatedToken?.refresh_token || "",
            twitterTokenExpiresAt: (new Date(Date.now() + (updatedToken?.expires_in || 2 * 1000) * 1000 - 60 * 1000)).toISOString(),
        })



        access_token = updatedToken?.access_token || "";
    }

    const responseTweet = await sendTweet(tweet, access_token);

    if (!responseTweet) {
        return {
            statusCode: 500,
            body: "Error sending tweet"
        };
    }
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
