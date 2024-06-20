import { generateError } from '../../utils/generateErrors.js';
import { db } from './db.js';

export async function getCompanionsByTravelId(travelId) {
  const [result] = await db.query(
    `SELECT DISTINCT u.id, u.username, u.name, u.avatar
    FROM companions c
      INNER JOIN users u ON c.userId = u.id
    WHERE c.travelId = :travelId`,
    { travelId }
  );

  return result;
}

export async function getTravelsCompanionsByUserId(userId) {
  const [result] = await db.query(
    `SELECT DISTINCT u.id, u.username, u.name, u.avatar 
      FROM travel t
        INNER JOIN companions c on t.travelId = c.travelId
        INNER JOIN users u ON c.userId = u.id
      WHERE t.userId = :userId
      `,
    { userId }
  );

  return result;
}

export async function addCompanion(travelId, companionId) {
  await db.query(
    'INSERT INTO companions (travelId, userId) VALUES(:travelId, :companionId)',
    {
      travelId,
      companionId,
    }
  );
}

export async function assertCompanionNotAdded(travelId, companionId) {
  const [[result]] = await db.query(
    'SELECT * FROM companions WHERE userId = :companionId AND travelId = :travelId',
    {
      travelId,
      companionId,
    }
  );

  if (result) {
    throw generateError(400, 'ERROR', 'Companion already added');
  }
}
