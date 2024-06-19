import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import {
  assertTravelExists,
  assertUserIsTravelOwner,
} from '../../database/structure/travels.js';
import {
  addCompanion,
  assertCompanionNotAdded,
} from '../../database/structure/companions.js';
import { assertUserExists } from '../../database/structure/users.js';
import { authGuard } from '../../middlewares/auth-guard.js';

export const addCompanionRoute = Router();

addCompanionRoute.post(
  '/travels/:travelId/companions',
  authGuard,
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    await assertTravelExists(req.params.travelId);
    await assertUserIsTravelOwner(req.currentUser.id, req.params.travelId);
    await assertUserExists(userId);

    await assertCompanionNotAdded(req.params.travelId, userId);

    await addCompanion(req.params.travelId, userId);

    res.status(201).send();
  })
);
