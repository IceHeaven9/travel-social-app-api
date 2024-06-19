import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { getTravelsCompanionsByUserId } from '../../database/structure/companions.js';
import { assertUserExists } from '../../database/structure/users.js';

export const getTravelsCompanionsByUserIdRoute = Router();

getTravelsCompanionsByUserIdRoute.get(
  '/users/:userId/travels-companions',
  asyncHandler(async (req, res) => {
    await assertUserExists(req.params.userId);

    const companions = await getTravelsCompanionsByUserId(req.params.userId);

    res.status(200).json({
      list: companions,
    });
  })
);
