import { PutObjectCommand } from "@aws-sdk/client-s3";
import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import { s3Client } from "../services/s3Client";
import { uuid } from 'uuidv4';

export const handler: Handler = async (
    event: HandlerEvent,
    context: HandlerContext
) => {

    //Check fro user auth
    const user = context.clientContext?.user;
    if (!user) {
        return {
            statusCode: 401,
            body: "You must be signed in to call this function"
        }
    }

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

    const uploadImage = async (file) => {
        const fileKey = `${uuid()}.jpg`; // Generate a unique key for the image. Assuming jpg format, you might need to adjust.

        const params = {
            Bucket: "x-plus-bucket",
            Key: fileKey,
            Body: file,
            ContentType: "image/jpeg", // Assuming jpg format, you might need to adjust
        };

        try {
            const results = await s3Client.send(new PutObjectCommand(params));
            console.log(results);
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    synced: true,
                    key: fileKey, // Return the key to the client for reference
                }),
            };
        } catch (error) {
            console.error('Error uploading to S3:', error);
            return {
                statusCode: 500,
                body: "Failed to upload image",
            };
        }
    };

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