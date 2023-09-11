export const S3_PROD_IMAGES_URL = process.env.NEXT_PUBLIC_S3_URL;

export const createS3ImageUrl = (
  s3HTTPURL: string,
  folderName: string,
  filename: string
): string => {
  const sanitizedFolderName = folderName
    .replace(/&/g, "%26")
    .replace(/\s+/g, "%20");
  return `${s3HTTPURL}/${sanitizedFolderName}/${filename}`;
};
