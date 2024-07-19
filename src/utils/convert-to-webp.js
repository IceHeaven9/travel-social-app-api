import sharp from "sharp";

export async function convertTravelImageToWebp(buffer) {
  return await sharp(buffer)
    .resize({
      width: 1920,
    })
    .webp({ quality: 80 })
    .toBuffer();
}

export async function convertAvatarToWebp(buffer) {
  return await sharp(buffer)
    .resize({
      width: 256,
    })
    .webp({ quality: 80 })
    .toBuffer();
}
