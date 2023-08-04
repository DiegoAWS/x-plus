import axios from "axios"

export async function getLoginUrl() {
    const data = await axios.get("/.netlify/functions/login")
    return data
}