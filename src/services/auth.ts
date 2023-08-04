import axios from "axios"

export function getLoginUrl() {
    return axios.get("/.netlify/functions/login-url")

}

export type LoginParams = {
    code: string;
    state: string;
}

export function login({ code, state }: LoginParams) {
    return axios.post("/.netlify/functions/login", { code, state }, {
        headers: {
            "Content-Type": "application/json"
        }
    })

}
