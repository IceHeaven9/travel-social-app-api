import { Router } from 'express';
import { getReactionController } from '../../controllers/reactions/reactions.js';

export const reactionRoutes = Router();

reactionRoutes.get('/travel/:id/reactions', getReactionController);
