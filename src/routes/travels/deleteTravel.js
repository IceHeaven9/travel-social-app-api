import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { authGuard } from '../../middlewares/auth-guard.js';
import { deleteTravelController } from '../../controllers/travels/deleteTravel.js';

export const deleteTravelRoutes = Router();

deleteTravelRoutes.delete(
  '/travels/:travelId',
  authGuard,
  asyncHandler(deleteTravelController)
);
