import aws from "aws-sdk";
import { v4 as uuidv4 } from 'uuid';


export const REGION = "eu-central-1";
export const BUCKET_NAME = "x-plus-bucket";
export const logoKey = "logos/";

const accessKeyId = process.env.S3_AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.S3_AWS_ACCESS_KEY_SECRET as string;

const s3Client = new aws.S3({
    region: REGION,
    accessKeyId,
    secretAccessKey,
    signatureVersion: "v4",
});

export const getUploadUrl = async (extension: string) => {
    const imageName = `${uuidv4()}.${extension}`;
    const params = {
        Bucket: BUCKET_NAME,
        Key: logoKey + imageName,
        Expires: 60,
        ContentType: "image/jpeg",
    };
    return s3Client.getSignedUrlPromise("putObject", params);

}
