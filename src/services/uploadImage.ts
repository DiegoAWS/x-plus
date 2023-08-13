import type { RcFile } from "antd/es/upload";
import axios from "axios"
import type { User } from "netlify-identity-widget"


export const uploadImage = async (file: RcFile, user: User) => {

    const extension = file.name.split(".").pop() || "";

    const uploadUrl = (await axios.get(`/.netlify/functions/get-upload-s3-url?extension=${extension}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user?.token?.access_token}`
        }
    }))?.data?.uploadUrl;

    if (!uploadUrl) throw new Error("Failed to get upload url")

    const response = await axios.put(uploadUrl, file, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    if(response.status !== 200) throw new Error("Failed to upload image")

    const url = uploadUrl.split("?")[0];

    return url;

}
