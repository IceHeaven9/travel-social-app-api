import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { getCompanionByUserIdController } from '../../controllers/companions/getCompanionByUserId.js';
export const getTravelsCompanionsByUserIdRoute = Router();

getTravelsCompanionsByUserIdRoute.get(
  '/users/:userId/travels-companions',
  asyncHandler(getCompanionByUserIdController)
);
