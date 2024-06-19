import { assertTravelExists } from '../../database/structure/travels.js';
import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { getCompanionsByTravelId } from '../../database/structure/companions.js';

export const getCompanionsByTravelIdRoute = Router();

getCompanionsByTravelIdRoute.get(
  '/travels/:travelId/companions',
  asyncHandler(async (req, res) => {
    await assertTravelExists(req.params.travelId);

    const companions = await getCompanionsByTravelId(req.params.travelId);

    res.status(200).json({
      list: companions,
    });
  })
);
