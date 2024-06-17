import { db } from './db.js';

export async function getCommentsCount(travelId) {
  const [[{ commentCount }]] = await db.query(
    `SELECT COUNT(*) as commentCount FROM comments WHERE travelId = :travelId`,
    { travelId }
  );
  return commentCount;
}
