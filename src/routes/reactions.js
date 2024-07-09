import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { authGuard } from '../middlewares/auth-guard.js';
import { setReactionController } from '../controllers/reactions/setReactionController.js';
import { deleteReactionController } from '../controllers/reactions/deleteReactionsController.js';

export const reactionRoutes = Router();

reactionRoutes.post(
  '/travels/:travelId/reactions',
  authGuard,
  asyncHandler(setReactionController)
);

reactionRoutes.delete(
  '/travels/:travelId/reactions',
  authGuard,
  asyncHandler(deleteReactionController)
);
