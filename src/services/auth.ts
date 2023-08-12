import axios from "axios"
import netlifyIdentity from "netlify-identity-widget";


export type LoginParams = {
    code: string;
    logo?: string;
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

export function updateLocalUser (){

}

