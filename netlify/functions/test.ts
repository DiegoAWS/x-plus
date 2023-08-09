// import type { Handler, HandlerEvent } from "@netlify/functions";
// // import { requestAccessToken } from "./services/twitter";

// //https://twitter.com/i/oauth2/authorize?state=challenge&code_challenge=challenge&code_challenge_method=plain&client_id=Wk5oRW93azZFcWltU2F2eVBUeTM6MTpjaQ&scope=tweet.read%20users.read%20tweet.write%20offline.access&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8888%2Fcreate-client-account

// export const handler: Handler = async (
//     event: HandlerEvent
// ) => {

//     const code = event.queryStringParameters?.code || "";

//     const { token, me } = await requestAccessToken(code);

//     return {
//         statusCode: 200,
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             token, me
//         })
//     }
// };