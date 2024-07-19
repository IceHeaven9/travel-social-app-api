import { Router } from "express";
import {
  parseTravelPayload,
  parseTravelSearchQuery,
} from "../validations/travels.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  assertTravelExists,
  assertUserIsTravelOwner,
  createTravel,
  deleteTravel,
  findTravelById,
  getAllTravels,
  searchTravels,
  updateTravel,
} from "../database/travels.js";
import { authGuard } from "../middlewares/auth-guard.js";

export const travelRoutes = Router();

travelRoutes.get(
  "/travels",
  asyncHandler(async (req, res) => {
    const { offset = 0 } = req.query;
    const currentUserId = req.currentUser?.id;

    const [travels, hasNextPage] = await getAllTravels(
      currentUserId,
      Number(offset)
    );

    res.status(200).json({
      list: travels,
      hasNextPage,
    });
  })
);

travelRoutes.get(
  "/travels/search",
  asyncHandler(async (req, res) => {
    const { text } = parseTravelSearchQuery(req.query);
    const currentUserId = req.currentUser?.id;

    const travels = await searchTravels(text, currentUserId);

    res.status(200).json({
      list: travels,
    });
  })
);

travelRoutes.get(
  "/travels/:travelId",
  asyncHandler(async (req, res) => {
    const currentUserId = req.currentUser?.id;

    const travel = await findTravelById(req.params.travelId, currentUserId);

    res.status(200).json(travel);
  })
);

travelRoutes.post(
  "/travels",
  authGuard,
  asyncHandler(async (req, res) => {
    const payload = parseTravelPayload(req.body);

    const id = await createTravel({
      title: payload.title,
      description: payload.description,
      rating: payload.rating,
      userId: req.currentUser.id,
    });

    res.status(201).json({
      id,
    });
  })
);

travelRoutes.patch(
  "/travels/:travelId",
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

travelRoutes.delete(
  "/travels/:travelId",
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
