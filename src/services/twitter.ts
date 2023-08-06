import axios from "axios"
import type { TwitterToken } from "../types";

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
