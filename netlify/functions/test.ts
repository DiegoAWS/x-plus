import type { Handler } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async () => {

    const client_id = process.env.TWITTER_CLIENT_ID
    const code_verifier = process.env.TWITTER_CLIENT_CODE;
    const redirect_uri = process.env.REDIRECT_URL


    const code = "RzVvVnZvTWNKZ2ljcUtyT2s3N2VHRmRUVGNVUUM4d1ZHWXJwODhIbG1GSUhLOjE2OTEwMDk4ODc1MjM6MToxOmFjOjE";

    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            grant_type: 'authorization_code',
            code,
            client_id,
            code_verifier,
            redirect_uri
        }
    };
    console.log({ params })
    // get access token from code
    const response = await axios.post('https://api.twitter.com/2/oauth2/token', {}, params);

    console.log({ response });

    return {
        statusCode: 200,
        body: JSON.stringify({ response:"" })
    }
};

export { handler };