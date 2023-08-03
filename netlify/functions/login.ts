
import type { Handler } from "@netlify/functions";
import { authClient } from "./services/auth";

const handler: Handler = async () => {
    const authUrl = authClient.generateAuthURL({
        state: process.env.TWITTER_STATE || "",
        code_challenge: process.env.TWITTER_STATE || "",
        code_challenge_method: "plain"
    });

    console.log({
        authUrl
    })

    // redirect to authUrl
    return {
        statusCode: 302,
        headers: {
            Location: authUrl
        }
    }
};

export { handler };
