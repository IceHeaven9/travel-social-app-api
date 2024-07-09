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

export async function getCurrentUserReaction(travelId, userId) {
  if (!userId) return 0;

  const [[reaction]] = await db.execute(
    'SELECT * FROM reactions WHERE travelId = :travelId AND userID = :userId',
    {
      travelId,
      userId,
    }
  );
  return reaction ? reaction.reactionType : 0;
}

export async function setReaction(travelId, userId, reactionType) {
  const [[reaction]] = await db.execute(
    'SELECT * FROM reactions WHERE travelId = :travelId AND userID = :userId',
    {
      travelId,
      userId,
    }
  );

  if (!reaction)
    await db.execute(
      'INSERT INTO reactions(travelId, userId, reactionType) VALUES(:travelId, :userId, :reactionType)',
      {
        travelId,
        userId,
        reactionType,
      }
    );
  else
    await db.execute(
      'UPDATE reactions SET reactionType = :reactionType WHERE id = :id ',
      {
        id: reaction.id,
        reactionType,
      }
    );
}

export async function removeReaction(travelId, userId) {
  await db.execute(
    'DELETE FROM reactions WHERE travelId = :travelId AND userID = :userId',
    {
      travelId,
      userId,
    }
  );
}
