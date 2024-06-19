import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { getAllTravels } from '../../database/structure/travels.js';

export const getAllTravelsRoutes = Router();

getAllTravelsRoutes.get(
  '/travels',
  asyncHandler(async (req, res) => {
    const { offset = 0 } = req.query;
    const travels = await getAllTravels(offset);

    res.status(200).json({
      list: travels,
    });
  })
);
