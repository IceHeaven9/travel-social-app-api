import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { authGuard } from '../../middlewares/auth-guard.js';
import { updateTravelController } from '../../controllers/travels/updateTravel.js';

export const updateTravelRoutes = Router();

updateTravelRoutes.patch(
  '/travels/:travelId',
  authGuard,
  asyncHandler(updateTravelController)
);
