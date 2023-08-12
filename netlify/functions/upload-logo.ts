
import type { Handler, HandlerEvent } from "@netlify/functions";

import { uploadImage } from "./services/uploadLogo";

export const handler: Handler = async (
    event: HandlerEvent
) => {

    // console.log(context.clientContext)
    // //Check fro user auth
    // const user = context.clientContext?.user;
    // if (!user) {
    //     return {
    //         statusCode: 401,
    //         body: "You must be signed in to call this function"
    //     }
    // }

    // Check for POST method
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405, // Method Not Allowed
            body: "Method not supported",
        };
    }

    const fileContent = event.body;
    if (!fileContent) {
        return {
            statusCode: 400,
            body: "No file content provided",
        };
    }

    // Decode the Base64 encoded file content
    const decodedFile = Buffer.from(fileContent, 'base64');



    console.log(decodedFile)


    const data = await uploadImage(decodedFile);


    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data,
        })
    }
};