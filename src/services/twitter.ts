import axios from "axios"
import type { TwitterToken } from "../types";
import { TWITTER_STATE, createLocalStorage } from "./localStore";

const scopes = ["tweet.read", "users.read", "tweet.write", "offline.access"];

export type TwittSend = {
    text: string;
    token: TwitterToken

}
export const sendTweet = async (tweet: TwittSend) => {
    return axios.post("/.netlify/functions/twitt", tweet,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
}

const TWITTER_CLIENT_ID = import.meta.env.VITE_TWITTER_CLIENT_ID as string
const CODE_CHALLENGE = import.meta.env.VITE_CODE_CHALLENGE as string
const TWITTER_CALLBACK = import.meta.env.VITE_TWITTER_CALLBACK as string

// twitter oauth Url constructor
export const getTwitterOauthUrl = () => {
    const rootUrl = "https://twitter.com/i/oauth2/authorize";
    const state = Math.random().toString(36).substring(7);
    
    createLocalStorage(TWITTER_STATE).set(state)

    const options = {
        redirect_uri: TWITTER_CALLBACK,
        client_id: TWITTER_CLIENT_ID,
        state,
        response_type: "code",
        code_challenge: CODE_CHALLENGE,
        code_challenge_method: "plain",
        scope: scopes.join(" "),
    };
    const qs = new URLSearchParams(options).toString();

    console.log( `${rootUrl}?${qs}`)
    throw new Error("test")
    return `${rootUrl}?${qs}`;
}

//https://twitter.com/i/oauth2/authorize?response_type=code&client_id=Wk5oRW93azZFcWltU2F2eVBUeTM6MTpjaQ&state=state&scope=tweet.read%2Busers.read%2Btweet.write%2Boffline.access&redirect_uri=https%3A%2F%2Fx-plus.netlify.app%2Fcreate-client-account&code_challenge=challenge&code_challenge_method=plain
//https://twitter.com/i/oauth2/authorize?redirect_uri=https%3A%2F%2Fx-plus.netlify.app%2Fcreate-client-account&client_id=Wk5oRW93azZFcWltU2F2eVBUeTM6MTpjaQ&state=kainot&response_type=code&code_challenge=challenge&code_challenge_method=plain&scope=tweet.read+users.read+tweet.write+offline.access
