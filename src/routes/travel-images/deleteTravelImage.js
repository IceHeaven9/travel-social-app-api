import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { authGuard } from '../../middlewares/auth-guard.js';
import { deleteTravelImageController } from '../../controllers/travel-images/deleteTravelImageController.js';

export const deleteTravelImageRoutes = Router();

deleteTravelImageRoutes.delete(
  '/travels/:travelId/photos/:photoId',
  authGuard,
  asyncHandler(deleteTravelImageController)
);
