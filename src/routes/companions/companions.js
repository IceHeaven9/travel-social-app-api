import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { addCompanionController } from '../../controllers/companions/addCompanion.js';
import { authGuard } from '../../middlewares/auth-guard.js';
import { getCompanionByTravelIdController } from '../../controllers/companions/getCompanionByTravelId.js';
import { getCompanionByUserIdController } from '../../controllers/companions/getCompanionByUserId.js';

export const companionRoutes = Router();

//add companion
companionRoutes.post(
  '/travels/:travelId/companions',
  authGuard,
  asyncHandler(addCompanionController)
);

//get companion by travelId
companionRoutes.get(
  '/travels/:travelId/companions',
  asyncHandler(getCompanionByTravelIdController)
);

//get companion by userId
companionRoutes.get(
  '/users/:userId/travels-companions',
  asyncHandler(getCompanionByUserIdController)
);
