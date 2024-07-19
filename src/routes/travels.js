import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authGuard } from "../middlewares/auth-guard.js";
import { getAllTravelsController } from "../controllers/travels/getAllTravelsController.js";
import { searchTravelController } from "../controllers/travels/searchTravelController.js";
import { findTravelByIdController } from "../controllers/travels/findTravelByIdController.js";
import { createTravelController } from "../controllers/travels/createTravelController.js";
import { updateTravelController } from "../controllers/travels/updateTravelController.js";
import { deleteTravelController } from "../controllers/travels/deleteTravelController.js";

export const travelRoutes = Router();

travelRoutes.get("/travels", asyncHandler(getAllTravelsController));

travelRoutes.get("/travels/search", asyncHandler(searchTravelController));

travelRoutes.get("/travels/:travelId", asyncHandler(findTravelByIdController));

travelRoutes.post("/travels", authGuard, asyncHandler(createTravelController));

travelRoutes.patch(
	"/travels/:travelId",
	authGuard,
	asyncHandler(updateTravelController)
);

travelRoutes.delete(
	"/travels/:travelId",
	authGuard,
	asyncHandler(deleteTravelController)
);
