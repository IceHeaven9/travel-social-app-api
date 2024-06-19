import { Router } from 'express';
import { getAllTravelsRoutes } from './getAllTravels.js';
import { findTravelByIdRoutes } from './findTravelById.js';
import { createTravelRoutes } from './createTravel.js';
import { updateTravelRoutes } from './updateTravel.js';
import { deleteTravelRoutes } from './deleteTravel.js';

export const travelRoutes = Router();

travelRoutes.use(getAllTravelsRoutes);

travelRoutes.use(findTravelByIdRoutes);

travelRoutes.use(createTravelRoutes);

travelRoutes.use(updateTravelRoutes);

travelRoutes.use(deleteTravelRoutes);
