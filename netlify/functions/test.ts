import type { Handler } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async () => {

    const client_id = process.env.TWITTER_CLIENT_ID || ""

    const code_verifier = process.env.TWITTER_CLIENT_CODE || ""
    const redirect_uri = process.env.REDIRECT_URL || ""


    const api_key = process.env.TWITTER_API_KEY || ""
    const api_secret = process.env.TWITTER_API_SECRET || ""


    const code = "SlJYY3VMZXdwWS1vQ0V0RTBpeXA4N3F3M1pNUlJ2RE9NdTItRW1HNVBhRFY3OjE2OTEwMTE3NzU3NzE6MTowOmFjOjE";

 



    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${api_key}:${api_secret}`).toString('base64')}`
        },
        params: {
            grant_type: 'authorization_code',
            code: code,
            client_id: client_id,
            code_verifier: code_verifier,
            redirect_uri: redirect_uri
        }
        
    };

    // get access token from code
    const response = await axios.post('https://api.twitter.com/2/oauth2/token' , {}, params);

    console.log({ response });

    return {
        statusCode: 200,
        body: JSON.stringify({ response:"" })
    }
};

export { handler };