import { Router } from 'express';

import { asyncHandler } from '../../utils/async-handler.js';
import { authGuard } from '../../middlewares/auth-guard.js';
import { addTravelPhotoController } from '../../controllers/travel-images/addTravelImageController.js';
import { deleteTravelImageController } from '../../controllers/travel-images/deleteTravelImageController.js';

export const travelImagesRoutes = Router();

// add image
travelImagesRoutes.post(
  '/travels/:travelId/photos',
  authGuard,
  asyncHandler(addTravelPhotoController)
);

// delete image
travelImagesRoutes.delete(
  '/travels/:travelId/photos/:photoId',
  authGuard,
  asyncHandler(deleteTravelImageController)
);
