import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { authGuard } from '../../middlewares/auth-guard.js';
import { createTravelController } from '../../controllers/travels/createTravel.js';

export const createTravelRoutes = Router();

createTravelRoutes.post(
  '/travels',
  authGuard,
  asyncHandler(createTravelController)
);
