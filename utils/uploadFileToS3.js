async function uploadFileToS3(file, fileNameIn) {
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
