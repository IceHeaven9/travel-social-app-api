import { Router } from 'express';
import { getCompanionsByTravelIdRoute } from './getCompanionsByTravelId.js';
import { getTravelsCompanionsByUserIdRoute } from './/getCompanionsByUserId.js';
import { addCompanionRoute } from '../companions/addcompanion.js';

export const companionRoutes = Router();

companionRoutes.use(getCompanionsByTravelIdRoute);

companionRoutes.use(getTravelsCompanionsByUserIdRoute);

companionRoutes.use(addCompanionRoute);
