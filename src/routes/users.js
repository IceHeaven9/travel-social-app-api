import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { authGuard } from "../middlewares/auth-guard.js";
import { updateUserProfileInfoController } from "../controllers/users/updateUserProfileInfoController.js";

export const userRoutes = Router();

userRoutes.patch(
	"/profile",
	authGuard,
	asyncHandler(updateUserProfileInfoController)
);
