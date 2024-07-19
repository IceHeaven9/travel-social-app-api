import { db } from "./db.js";

export async function getMainImage(travelId) {
  const [[image]] = await db.query(
    `SELECT * FROM travelImages WHERE travelId = :travelId LIMIT 1`,
    { travelId }
  );
  return image;
}
