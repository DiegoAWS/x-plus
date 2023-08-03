
import type { Handler } from "@netlify/functions";
import { authTwitter } from "./services/authTwitter";

const handler: Handler = async () => {
    const { getAuthUrl } = await authTwitter();

    const authUrl = getAuthUrl();

    // redirect to authUrl
    return {
        statusCode: 302,
        headers: {
            Location: authUrl
        }
    }
};

export { handler };
