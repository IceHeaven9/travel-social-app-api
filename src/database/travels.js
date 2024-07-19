import { getCommentsCount } from "./comments.js";
import { db } from "./db.js";
import { getMainImage } from "./images.js";
import { getCurrentUserReaction, getReactionsCount } from "./reactions.js";
import { getUserInfo } from "./users.js";

export async function getAllTravels(currentUserId, offset = 0) {
  const [travels] = await db.query(
    `SELECT * FROM travels 
    WHERE deletedAt IS NULL
    ORDER BY createdAt DESC
    LIMIT 20
    OFFSET :offset`,
    { offset }
  );

  const [[{ totalTravels }]] = await db.query(
    `SELECT COUNT(*) as totalTravels FROM travels WHERE deletedAt IS NULL`
  );

  const hasNextPage = Number(totalTravels) > offset + 20;

  return [
    await Promise.all(
      travels.map(async (travel) => {
        return {
          ...travel,
          mainImage: (await getMainImage(travel.id)) ?? null,
          commentsCount: await getCommentsCount(travel.id),
          reactionsCount: await getReactionsCount(travel.id),
          currentReaction: await getCurrentUserReaction(
            travel.id,
            currentUserId
          ),
          user: await getUserInfo(travel.userId),
        };
      })
    ),
    hasNextPage,
  ];
}

export async function findTravelById(travelId, currentUserId) {
  const [[travel]] = await db.query(
    "SELECT * FROM travels WHERE id = :travelId",
    { travelId }
  );

  if (!travel) {
    throw {
      status: 404,
      name: "TRAVEL_NOT_FOUND",
      message: "The travel does not exist",
    };
  }

  return {
    ...travel,
    commentsCount: await getCommentsCount(travelId),
    reactionsCount: await getReactionsCount(travelId),
    currentReaction: await getCurrentUserReaction(travel.id, currentUserId),
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
    throw {
      status: 404,
      name: "TRAVEL_NOT_FOUND",
      message: "The travel does not exist",
    };
  }
}

export async function assertUserIsTravelOwner(userId, travelId) {
  const [[result]] = await db.query(
    `SELECT id FROM travels 
    WHERE userId = :userId AND id = :travelId`,
    { userId, travelId }
  );

  if (!result) {
    throw {
      status: 403,
      name: "NOT_TRAVEL_OWNER",
      message: "You are not the owner of this travel",
    };
  }
}

export async function searchTravels(text, userId, offset = 0) {
  const [travels] = await db.query(
    `SELECT * FROM travels 
    WHERE deletedAt IS NULL AND (title LIKE :text OR description LIKE :text)
    ORDER BY createdAt DESC 
    LIMIT 20
    OFFSET :offset`,
    { text: `%${text}%`, offset: offset }
  );

  return await Promise.all(
    travels.map(async (travel) => {
      return {
        ...travel,
        mainImage: (await getMainImage(travel.id)) ?? null,
        commentsCount: await getCommentsCount(travel.id),
        reactionsCount: await getReactionsCount(travel.id),
        currentReaction: await getCurrentUserReaction(travel.id, userId),
        user: await getUserInfo(travel.userId),
      };
    })
  );
}
