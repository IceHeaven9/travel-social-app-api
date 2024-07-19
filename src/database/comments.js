import { db } from "./db.js";

export async function getCommentsCount(travelId) {
  const [[{ commentCount }]] = await db.query(
    `SELECT COUNT(*) as commentCount FROM comments WHERE travelId = :travelId`,
    { travelId }
  );
  return commentCount;
}

export async function addComment(travelId, userId, message) {
  const [result] = await db.query(
    `INSERT INTO comments (travelId, userId, message) VALUES (:travelId, :userId, :message)`,
    { travelId, userId, message }
  );
  return result.insertId;
}

export async function editComment(commentId, message) {
  await db.query(
    `UPDATE comments SET message = :message WHERE id = :commentId`,
    { commentId, message }
  );
}

export async function deleteComment(commentId) {
  await db.query(`DELETE FROM comments WHERE id = :commentId`, { commentId });
}

export async function assertUserIsCommentOwner(commentId, userId) {
  const [[comment]] = await db.query(
    `SELECT userId FROM comments WHERE id = :commentId AND userId = :userId`,
    { commentId, userId }
  );

  if (!comment) {
    throw {
      status: 403,
      name: "NOT_COMMENT_OWNER",
      message: "You are not the owner of this comment",
    };
  }
}

export async function getTravelComments(travelId) {
  const [comments] = await db.query(
    `SELECT * from comments WHERE travelId = :travelId`,
    { travelId }
  );

  await Promise.all(
    comments.map(async (comment) => {
      const [[user]] = await db.query(
        `SELECT id, username, avatar from users WHERE id = :userId`,
        { userId: comment.userId }
      );
      comment.user = user;
    })
  );

  return comments;
}
