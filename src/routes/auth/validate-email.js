import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { validateEmailController } from '../../controllers/auth/validate-email.js';

export const validateEmailAuthRoutes = Router();

validateEmailAuthRoutes.post(
  '/validate-email',
  asyncHandler(validateEmailController)
);
