export function parseTravelImage(file) {
  if (!file) {
    throw {
      status: 400,
      name: "MISSING_FILE",
      message: "The file is required",
    };
  }

  if (!file.mimetype.startsWith("image")) {
    throw {
      status: 400,
      name: "INVALID_FILE",
      message: "The file must be an image",
    };
  }

  return file;
}
