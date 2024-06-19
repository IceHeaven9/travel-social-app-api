import { db } from './db.js';

export async function getCommentsCount(travelId) {
  const [[{ commentCount }]] = await db.query(
    `SELECT COUNT(*) as commentCount FROM comments WHERE travelId = :travelId`,
    { travelId }
  );
  return commentCount;
}

export async function getComments(travelId) {
  const [[comments]] = await db.query(
    `SELECT * FROM comments  WHERE travelId = :travelId ORDER BY travelId DESC`,
    { travelId }
  );
  return comments;
}
