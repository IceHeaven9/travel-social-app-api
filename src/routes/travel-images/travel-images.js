import { Router } from 'express';
import { addTravelPhotoRoutes } from './addTravelImage.js';
import { deleteTravelImageRoutes } from './deleteTravelImage.js';

export const travelImagesRoutes = Router();

travelImagesRoutes.use(addTravelPhotoRoutes);

travelImagesRoutes.use(deleteTravelImageRoutes);
