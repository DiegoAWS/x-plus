import { S3Client } from "@aws-sdk/client-s3";


const REGION = "eu-central-1";

const s3Client = new S3Client({
    region: REGION,
    credentials:{
        accessKeyId:  import.meta.env.VITE_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: import.meta.env.VITE_AWS_ACCESS_KEY_SECRET as string
    }
});

export { s3Client };