import { UploadApiOptions, UploadApiResponse } from 'cloudinary';
import cloudinary from '../client';
import { Buffer } from 'node:buffer';
import { checkFileTypeBeforeUpload } from '../lib';

export const uploadToCloudinary = async (fileInput: File | FileList | File[], options: UploadApiOptions = {}) => {
  const file = checkFileTypeBeforeUpload(fileInput);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result as UploadApiResponse);
      })
      .end(buffer);
  });
};
