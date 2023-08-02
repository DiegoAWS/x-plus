/* eslint-disable no-undef */
const scopesArray = ["tweet.write","offline.access"]
const scope = encodeURIComponent(scopesArray.join(" "))

const prepareAuthUrl = (redirect_uri) => {
    const client_id = process.env.TWITTER_CLIENT_ID || "Wk5oRW93azZFcWltU2F2eVBUeTM6MTpjaQ";
    const code = process.env.TWITTER_CLIENT_CODE || "challenge" 
    
    return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=state&code_challenge=${code}&code_challenge_method=plain`
}

const url = prepareAuthUrl("https://x-plus.netlify.app/.netlify/functions/callback")

console.log({ url })

//https://twitter.com/i/oauth2/authorize?response_type=code&state=state&code_challenge=challengee&code_challenge_method=plain
//https://twitter.com/i/oauth2/authorize?response_type=code&state=state&code_challenge=challenge&code_challenge_method=plain

