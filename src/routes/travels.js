import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { authGuard } from '../middlewares/auth-guard.js';
import { updateTravelController } from '../controllers/travels/updateTravel.js';
import { getAllTravelsController } from '../controllers/travels/getAllTravels.js';
import { findTravelByIdController } from '../controllers/travels/findTravelById.js';
import { deleteTravelController } from '../controllers/travels/deleteTravel.js';
import { createTravelController } from '../controllers/travels/createTravel.js';

export const travelRoutes = Router();

// create travel
travelRoutes.post('/travels', authGuard, asyncHandler(createTravelController));

//get all travels
travelRoutes.get('/travels', asyncHandler(getAllTravelsController));

// find travel by id
travelRoutes.get('/travels/:travelId', asyncHandler(findTravelByIdController));

// update travel
travelRoutes.patch(
  '/travels/:travelId',
  authGuard,
  asyncHandler(updateTravelController)
);

// delete travel
travelRoutes.delete(
  '/travels/:travelId',
  authGuard,
  asyncHandler(deleteTravelController)
);
