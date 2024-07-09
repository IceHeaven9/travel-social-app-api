import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { validateEmailController } from '../controllers/auth/validate-email.js';
import { registerAuthController } from '../controllers/auth/registerController.js';
import { loginController } from '../controllers/auth/loginController.js';

export const authRoutes = Router();

authRoutes.post('/validate-email', asyncHandler(validateEmailController));

authRoutes.post('/register', asyncHandler(registerAuthController));

authRoutes.post('/login', asyncHandler(loginController));
