
import type { Handler } from "@netlify/functions";
import { authTwitter } from "./services/authTwitter";

const handler: Handler = async () => {
    const { getAuthUrl } = await authTwitter();

    const authUrl = getAuthUrl();

    return {
      statusCode: 200,
        body: JSON.stringify({ authUrl }),
    }
};

export { handler };