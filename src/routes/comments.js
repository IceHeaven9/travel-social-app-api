import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { authGuard } from '../middlewares/auth-guard.js';
import { getTravelCommentsController } from '../controllers/comments/getTravelCommentsController';
import { addCommentController } from '../controllers/comments/addCommentController';
import { editCommentController } from '../controllers/comments/editCommentController';
import { deleteCommentController } from '../controllers/comments/deleteCommentController';

export const commentRoutes = Router();

commentRoutes.get(
  '/travels/:travelId/comments',
  asyncHandler(getTravelCommentsController)
);

commentRoutes.post(
  '/travels/:travelId/comments',
  authGuard,
  asyncHandler(addCommentController)
);

commentRoutes.patch(
  '/travels/:travelId/comments/:commentId',
  authGuard,
  asyncHandler(editCommentController)
);

commentRoutes.delete(
  '/travels/:travelId/comments/:commentId',
  authGuard,
  asyncHandler(deleteCommentController)
);
