// import type { Handler, HandlerEvent } from "@netlify/functions";
// import { authTwitter } from "./services/authTwitter";

// const handler: Handler = async (event: HandlerEvent) => {
//   // console.log(event)
//   const { token, text } = JSON.parse(event?.body || "{}");

//   if (!token) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({
//         message: "Missing code or state"
//       })
//     }
//   }

//   const { publishTweet, token: newToken } = await authTwitter(
//     token
//   );

//   const tweet = await publishTweet(text);


//   return {
//     statusCode: 200,
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       tweet,
//       newToken
//     })
//   }
// };

// export { handler };
