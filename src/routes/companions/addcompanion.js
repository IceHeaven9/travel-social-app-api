import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { addCompanionController } from '../../controllers/companions/addCompanion.js';
import { authGuard } from '../../middlewares/auth-guard.js';

export const addCompanionRoute = Router();

addCompanionRoute.post(
  '/travels/:travelId/companions',
  authGuard,
  asyncHandler(addCompanionController)
);
