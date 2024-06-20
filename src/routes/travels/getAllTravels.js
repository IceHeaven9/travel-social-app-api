import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';
import { getAllTravelsController } from '../../controllers/travels/getAllTravels.js';

export const getAllTravelsRoutes = Router();

getAllTravelsRoutes.get('/travels', asyncHandler(getAllTravelsController));
