import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { registerAuthController } from '../../controllers/auth/registerController.js';

export const registerAtuhRoute = Router();

registerAtuhRoute.post('/register', asyncHandler(registerAuthController));
