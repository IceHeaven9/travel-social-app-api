import { db } from './db.js';

export async function saveTravelImage(travelId, url) {
  const [{ insertId }] = await db.query(
    `INSERT INTO travelImages (travelId,url) VALUES (:travelId,:url)`,
    {
      travelId,
      url,
    }
  );
  return insertId;
}

export async function getTravelImageById(id) {
  const [[travelImage]] = await db.query(
    `SELECT * FROM travelImages WHERE id = :id`,
    { id }
  );
  return travelImage;
}

export async function getTravelImageByTravelId(travelId) {
  const [travelImage] = await db.query(
    'SELECT * FROM travelImages WHERE travelId = :travelId',
    { travelId }
  );
  return travelImage;
}

export async function deleteTravelImage(id) {
  await db.query(`DELETE FROM travelImages WHERE id = :id`, { id });
}
