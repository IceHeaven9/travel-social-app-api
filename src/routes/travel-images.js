import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authGuard } from "../middlewares/auth-guard.js";

import { saveTravelImageController } from "../controllers/travel-images/saveTravelImageController.js";
import { deleteTavelImageController } from "../controllers/travel-images/deleteTravelImageController.js";
import { getTravelImageByTravelIdController } from "../controllers/travel-images/getTravelImageByTravelIdController.js";

export const travelImagesRoutes = Router();

travelImagesRoutes.post(
	"/travels/:travelId/photos",
	authGuard,
	asyncHandler(saveTravelImageController)
);

travelImagesRoutes.delete(
	"/travels/:travelId/photos/:photoId",
	authGuard,
	asyncHandler(deleteTavelImageController)
);

travelImagesRoutes.get(
	"/travels/:travelId/photos",
	asyncHandler(getTravelImageByTravelIdController)
);
