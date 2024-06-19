import { Router } from 'express';
import { parseTravelPayload } from '../../validations/travels.js';
import { asyncHandler } from '../../utils/async-handler.js';
import {
  assertTravelExists,
  assertUserIsTravelOwner,
  updateTravel,
} from '../../database/structure/travels.js';
import { authGuard } from '../../middlewares/auth-guard.js';

export const updateTravelRoutes = Router();

updateTravelRoutes.patch(
  '/travels/:travelId',
  authGuard,
  asyncHandler(async (req, res) => {
    const payload = parseTravelPayload(req.body);

    await assertTravelExists(req.params.travelId);
    await assertUserIsTravelOwner(req.currentUser.id, req.params.travelId);

    await updateTravel({
      title: payload.title,
      description: payload.description,
      rating: payload.rating,
      travelId: req.params.travelId,
    });

    await res.status(200).send();
  })
);
