import { generateError } from '../../utils/generateErrors.js';
import { getCommentsCount } from './comments.js';
import { db } from './db.js';
import { getMainImage } from './images.js';
import { getReactionsCount } from './reactions.js';
import { getUserInfo } from './users.js';

export async function getAllTravels(offset = 0) {
  const [travels] = await db.query(
    `SELECT * FROM travels 
    WHERE deletedAt IS NULL
    ORDER BY createdAt DESC
    LIMIT 20
    OFFSET :offset`,
    { offset }
  );

  return await Promise.all(
    travels.map(async (travel) => {
      return {
        ...travel,
        mainImage: (await getMainImage(travel.id)) ?? null,
        commentsCount: await getCommentsCount(travel.id),
        reactionsCount: await getReactionsCount(travel.id),
        user: await getUserInfo(travel.userId),
      };
    })
  );
}

export async function findTravelById(travelId) {
  const [[travel]] = await db.query(
    'SELECT * FROM travels WHERE id = :travelId',
    { travelId }
  );

  if (!travel) {
    throw generateError(404, 'ERROR', 'TRAVEL_NOT_FOUND');
  }

  return {
    ...travel,
    commentsCount: await getCommentsCount(travelId),
    reactionsCount: await getReactionsCount(travelId),
    user: await getUserInfo(travel.userId),
  };
}

export async function createTravel({ title, description, rating, userId }) {
  const [result] = await db.query(
    `INSERT INTO travels (title, description, rating, userId)
     VALUES (:title, :description, :rating, :userId)`,
    { title, description, rating, userId }
  );
  return result.insertId;
}

export async function updateTravel(travel) {
  await db.query(
    `UPDATE travels 
    SET title = :title, description = :description, rating = :rating
    WHERE id = :travelId`,
    travel
  );
}

export async function deleteTravel(travelId) {
  await db.query(
    `UPDATE travels 
    SET deletedAt = NOW()
    WHERE id = :travelId`,
    { travelId }
  );
}

export async function assertTravelExists(travelId) {
  const [result] = await db.query(
    `SELECT id FROM travels 
    WHERE id = :travelId`,
    { travelId }
  );

  if (result.length == 0) {
    throw generateError(404, 'ERROR', 'The travel does not exist');
  }
}

export async function assertUserIsTravelOwner(userId, travelId) {
  const [result] = await db.query(
    `SELECT id FROM travels 
    WHERE userId = :userId AND id = :travelId`,
    { userId, travelId }
  );

  if (result.length == 0) {
    throw generateError(403, 'ERROR', 'You are not the owner of this travel');
  }
}

//  status: 403,
//       name: 'NOT_TRAVEL_OWNER',
//       message: 'You are not the owner of this travel',
