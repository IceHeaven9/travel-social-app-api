import { Router } from 'express';

import { asyncHandler } from '../../utils/async-handler.js';
import { findTravelById } from '../../database/structure/travels.js';

export const findTravelByIdRoutes = Router();

findTravelByIdRoutes.get(
  '/travels/:travelId',
  asyncHandler(async (req, res) => {
    const travel = await findTravelById(req.params.travelId);

    res.status(200).json(travel);
  })
);
