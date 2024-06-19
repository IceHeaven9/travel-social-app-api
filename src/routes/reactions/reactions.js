import { Router } from 'express';
import { getReactions } from '../../database/structure/reactions.js';

export const reactionRoutes = Router();

reactionRoutes.get('/travel/:id/reactions', async (req, res) => {
  const reactions = await getReactions(req.params.id);
  res.status(200).json({
    list: reactions,
  });
});
