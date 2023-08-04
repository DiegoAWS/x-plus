import axios from "axios"

export  function getLoginUrl() {
    return axios.get("/.netlify/functions/login")
    
}