export const checkFileTypeBeforeUpload = (fileInput: File | FileList | File[]) => {
  let file: File;
  if (fileInput instanceof File) {
    file = fileInput;
  } else if (fileInput instanceof FileList || Array.isArray(fileInput)) {
    file = fileInput[0];
  } else {
    throw new Error('Invalid file input');
  }

  if (!file) {
    throw new Error('No file provided');
  }

  return file;
};
