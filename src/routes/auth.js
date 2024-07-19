import { Router } from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { createUserController } from "../controllers/auth/createUserController.js";
import { loginController } from "../controllers/auth/loginController.js";
import { validateEmailController } from "../controllers/auth/validateEmailController.js";

export const authRoutes = Router();

authRoutes.post("/register", asyncHandler(createUserController));

authRoutes.post("/login", asyncHandler(loginController));

authRoutes.post("/validate-email", asyncHandler(validateEmailController));
