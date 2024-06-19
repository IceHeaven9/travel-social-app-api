import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import {
  assertTravelExists,
  assertUserIsTravelOwner,
  deleteTravel,
} from '../../database/structure/travels.js';
import { authGuard } from '../../middlewares/auth-guard.js';

export const deleteTravelRoutes = Router();

deleteTravelRoutes.delete(
  '/travels/:travelId',
  authGuard,
  asyncHandler(async (req, res) => {
    const travelId = req.params.travelId;
    const userId = req.currentUser.id;

    await assertTravelExists(travelId);
    await assertUserIsTravelOwner(userId, travelId);

    await deleteTravel(travelId);

    await res.status(200).send();
  })
);
