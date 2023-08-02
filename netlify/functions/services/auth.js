/* eslint-disable no-undef */
const scopesArray = ["tweet.write"]
const scope = encodeURIComponent(scopesArray.join(" "))

const prepareAuthUrl = (redirect_uri) => {
    const client_id = process.env.TWITTER_CLIENT_ID || "Wk5oRW93azZFcWltU2F2eVBUeTM6MTpjaQ";
    const code = encodeURIComponent(process.env.TWITTER_CLIENT_CODE || "s3kymb8tcloo5s8sf6mgc8u7u08wkcwogjczacypo12u4oshfl");
    
    return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=state&code_challenge=${code}e&code_challenge_method=plain`
}

const url = prepareAuthUrl("https://x-plus.netlify.app/.netlify/functions/callback")

console.log({ url })
