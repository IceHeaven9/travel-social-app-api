import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import {
  addComment,
  assertUserIsCommentOwner,
  deleteComment,
  editComment,
  getTravelComments,
} from "../database/comments.js";
import {
  assertTravelExists,
  assertUserIsTravelOwner,
} from "../database/travels.js";
import { authGuard } from "../middlewares/auth-guard.js";

export const commentRoutes = Router();

commentRoutes.get(
  "/travels/:travelId/comments",
  asyncHandler(async (req, res) => {
    const travelId = req.params.travelId;
    await assertTravelExists(travelId);

    const comments = await getTravelComments(travelId);

    res.status(200).json({
      list: comments,
    });
  })
);

commentRoutes.post(
  "/travels/:travelId/comments",
  authGuard,
  asyncHandler(async (req, res) => {
    const travelId = req.params.travelId;
    const userId = req.currentUser.id;
    const message = req.body.message;

    await assertTravelExists(travelId);

    const id = await addComment(travelId, userId, message);

    res.status(201).json({
      id,
    });
  })
);

commentRoutes.patch(
  "/travels/:travelId/comments/:commentId",
  authGuard,
  asyncHandler(async (req, res) => {
    const travelId = req.params.travelId;
    const commentId = req.params.commentId;
    const userId = req.currentUser.id;
    const message = req.body.message;

    await assertTravelExists(travelId);
    await assertUserIsCommentOwner(commentId, userId);

    await editComment(commentId, message);

    res.status(200).send();
  })
);

commentRoutes.delete(
  "/travels/:travelId/comments/:commentId",
  authGuard,
  asyncHandler(async (req, res) => {
    const travelId = req.params.travelId;
    const commentId = req.params.commentId;
    const userId = req.currentUser.id;

    await assertTravelExists(travelId);
    await assertUserIsCommentOwner(commentId, userId);

    await deleteComment(commentId);

    res.status(200).send();
  })
);
