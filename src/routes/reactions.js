import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { removeReaction, setReaction } from "../database/reactions.js";
import { authGuard } from "../middlewares/auth-guard.js";

export const reactionRoutes = Router();

reactionRoutes.post(
  "/travels/:travelId/reactions",
  authGuard,
  asyncHandler(async (req, res) => {
    //TODO: validar
    const reaction = req.body.reaction; //number
    const currentUser = req.currentUser; //usuario actual

    await setReaction(req.params.travelId, currentUser.id, reaction);

    res.status(200).json({
      ok: true,
    });
  })
);

reactionRoutes.delete(
  "/travels/:travelId/reactions",
  authGuard,
  asyncHandler(async (req, res) => {
    //TODO: validar
    const currentUser = req.currentUser; //usuario actual

    await removeReaction(req.params.travelId, currentUser.id);

    res.status(200).json({
      ok: true,
    });
  })
);
