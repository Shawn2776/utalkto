// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import convertFileName from "./convertFileName";

// const s3Client = new S3Client({
//   region: process.env.AWS_S3_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//   },
// });

async function uploadFileToS3(file, fileNameIn) {
  // const fileName = fileNameIn;
  const fileToSend = file;
  const { newFileName, paramContentType } = await convertFileName(fileNameIn);
  const fileBuffer = file;

  const fileName = newFileName;

  const formData = new FormData();
  formData.append("file", fileToSend);

  try {
    const response = await fetch("/api/s3-upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
  } catch (error) {
    console.log("try error: ", error);
  }
  return newFileName;
}

export default uploadFileToS3;
