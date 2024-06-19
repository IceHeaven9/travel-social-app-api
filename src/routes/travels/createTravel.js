import { Router } from 'express';
import { parseTravelPayload } from '../../validations/travels.js';
import { asyncHandler } from '../../utils/async-handler.js';
import { createTravel } from '../../database/structure/travels.js';
import { authGuard } from '../../middlewares/auth-guard.js';

export const createTravelRoutes = Router();

createTravelRoutes.post(
  '/travels',
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
