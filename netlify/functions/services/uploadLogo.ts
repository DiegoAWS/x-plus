import { uuid } from "uuidv4";
import { s3Client } from "./s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadImage = async (file) => {
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
            fileKey,
            results
        }
    } catch (error) {
        console.error('Error uploading to S3:', error);
        return {
            statusCode: 500,
            body: "Failed to upload image",
        };
    }
};
