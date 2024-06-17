import { db } from './db.js';

export async function getReactionsCount(travelId) {
  const [[{ reactionsCount }]] = await db.query(
    `SELECT COALESCE(SUM(reactionType),0) as reactionsCount
        FROM reactions
        WHERE travelId = :travelId`,
    { travelId }
  );

  return Number(reactionsCount);
}
