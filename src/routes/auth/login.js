import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { loginController } from '../../controllers/auth/loginController.js';

export const loginAuthRoutes = Router();

loginAuthRoutes.post('/login', asyncHandler(loginController));
