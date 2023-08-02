import type { Handler, HandlerEvent } from "@netlify/functions";
import axios from "axios";

const handler: Handler = async (event: HandlerEvent) => {

  const code_verifier = process.env.TWITTER_CLIENT_CODE;
  const client_id = process.env.TWITTER_CLIENT_ID
  const redirect_uri = process.env.REDIRECT_URL

  

  const code = event?.queryStringParameters?.code;

  if (!code) {
    return {
      statusCode: 400,
      body: 'No code provided'
    }
  }

  console.log({ code });
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

  // redirect to /
  return {
    statusCode: 302,
    headers: {
      Location: '/'
    },

  }
};

export { handler };