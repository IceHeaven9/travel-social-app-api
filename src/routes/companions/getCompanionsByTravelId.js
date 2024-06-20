import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { getCompanionByTravelIdController } from '../../controllers/companions/getCompanionByTravelId.js';

export const getCompanionsByTravelIdRoute = Router();

getCompanionsByTravelIdRoute.get(
  '/travels/:travelId/companions',
  asyncHandler(getCompanionByTravelIdController)
);
