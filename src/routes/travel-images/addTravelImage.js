import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { authGuard } from '../../middlewares/auth-guard.js';
import { addTravelPhotoController } from '../../controllers/travel-images/addTravelImageController.js';

export const addTravelPhotoRoutes = Router();

addTravelPhotoRoutes.post(
  '/travels/:travelId/photos',
  authGuard,
  asyncHandler(addTravelPhotoController)
);
