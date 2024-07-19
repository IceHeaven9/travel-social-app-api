import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authGuard } from "../middlewares/auth-guard.js";
import { getCompanionsByTravelIdController } from "../controllers/companions/getCompanionByTravelIdController.js";
import { getCompanionsByUserIdController } from "../controllers/companions/getCompanionByUserIdController.js";
import { addCompanionController } from "../controllers/companions/addCompanionController.js";

export const companionRoutes = Router();

companionRoutes.get(
	"/travels/:travelId/companions",
	asyncHandler(getCompanionsByTravelIdController)
);

companionRoutes.get(
	"/users/:userId/travels-companions",
	asyncHandler(getCompanionsByUserIdController)
);

companionRoutes.post(
	"/travels/:travelId/companions",
	authGuard,
	asyncHandler(addCompanionController)
);
