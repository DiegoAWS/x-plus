import axios from "axios"
import netlifyIdentity from "netlify-identity-widget";
export function getLoginUrl() {
    console.log(netlifyIdentity.currentUser)

    return axios.get("/.netlify/functions/get-twitter-url",
    {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
        }
    })

}

export type LoginParams = {
    code: string;
    state: string;
    companyName: string;
}

export function login(params: LoginParams) {
    return axios.post("/.netlify/functions/login-twitter", params, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`
        }
    })

}
