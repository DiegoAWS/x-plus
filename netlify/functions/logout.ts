
import type { Handler } from "@netlify/functions";
import { authClient } from "./services/auth";

const handler: Handler = async () => {

    if (authClient.token) {
        await authClient.revokeAccessToken();
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Logged out" })
    }
};

export { handler };
