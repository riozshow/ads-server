require('dotenv').config();
const fs = require('fs');
const { v4 } = require('uuid');
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.S3_SECRET_KEY;

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

module.exports.uploadImage = async (path) => {
  const key = v4();

  const stream = await fs.createReadStream(path);
  const input = {
    Body: stream,
    Bucket: bucketName,
    Key: key,
  };
  const command = new PutObjectCommand(input);
  await s3.send(command);

  fs.unlinkSync(path);

  return key;
};

module.exports.getImage = async (key) => {
  const input = {
    Bucket: bucketName,
    Key: key,
  };

  const command = new GetObjectCommand(input);
  return await s3.send(command);
};

module.exports.deleteImage = async (key) => {
  const input = {
    Bucket: bucketName,
    Key: key,
  };
  const command = new DeleteObjectCommand(input);
  return await s3.send(command);
};
