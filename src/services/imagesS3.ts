import type { RcFile } from 'antd/es/upload';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from './s3Client';




export const uploadImage = async (file: RcFile) => {
    const params = {
        Bucket: "x-plus-bucket", // The name of the bucket. For example, 'sample-bucket-101'.
        Key: "KEY", // The name of the object. For example, 'sample_upload.txt'.
        Body: file, // The content of the object. For example, 'Hello world!".
    };
    const results = await s3Client.send(new PutObjectCommand(params));

    console.log(results);
};
