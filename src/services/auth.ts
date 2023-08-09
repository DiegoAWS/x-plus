import axios from "axios"

export function getLoginUrl() {
    return axios.get("/.netlify/functions/get-twitter-url",
    {
        headers: {
            "Content-Type": "application/json"
        }
    })

}

export type LoginParams = {
    code: string;
    state: string;
}

export function login({ code, state }: LoginParams) {
    return axios.post("/.netlify/functions/login-twitter", { code, state }, {
        headers: {
            "Content-Type": "application/json"
        }
    })

}
