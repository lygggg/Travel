import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_UPLOAD_KEY,
  secretAccessKey: process.env.S3_UPLOAD_SECRET,
});

export const deleteImage = (ImageKey) => {
  s3.deleteObject(
    {
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: ImageKey,
    },
    (err, data) => {
      return data;
    },
  );
};
