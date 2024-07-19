import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import {
  assertTravelExists,
  assertUserIsTravelOwner,
} from "../database/travels.js";
import {
  addCompanion,
  assertCompanionNotAdded,
  getCompanionsByTravelId,
  getTravelsCompanionsByUserId,
} from "../database/companions.js";
import { assertUserExists } from "../database/users.js";
import { authGuard } from "../middlewares/auth-guard.js";

export const companionRoutes = Router();

companionRoutes.get(
  "/travels/:travelId/companions",
  asyncHandler(async (req, res) => {
    await assertTravelExists(req.params.travelId);

    const companions = await getCompanionsByTravelId(req.params.travelId);

    res.status(200).json({
      list: companions,
    });
  })
);

companionRoutes.get(
  "/users/:userId/travels-companions",
  asyncHandler(async (req, res) => {
    await assertUserExists(req.params.userId);

    const companions = await getTravelsCompanionsByUserId(req.params.userId);

    res.status(200).json({
      list: companions,
    });
  })
);

companionRoutes.post(
  "/travels/:travelId/companions",
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
