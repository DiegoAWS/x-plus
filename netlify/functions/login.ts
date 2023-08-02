
import type { Handler } from "@netlify/functions";
import { authClient } from "./services/auth";

const handler: Handler = async () => {

    const authUrl = authClient.generateAuthURL({
        state: process.env.TWITTER_STATE || "",
        code_challenge_method: "s256",
    });


    // redirect to authUrl
    return {
        statusCode: 302,
        headers: {
            Location: authUrl,
        }
    }
};

export { handler };
