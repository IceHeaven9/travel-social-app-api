import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { findTravelByIdController } from '../../controllers/travels/findTravelById.js';

export const findTravelByIdRoutes = Router();

findTravelByIdRoutes.get(
  '/travels/:travelId',
  asyncHandler(findTravelByIdController)
);
