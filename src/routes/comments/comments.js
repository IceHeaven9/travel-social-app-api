import { Router } from 'express';
import { getComments } from '../../database/structure/comments.js';
export const commentRoutes = Router();

commentRoutes.get('/travel/:id/comments', async (req, res) => {
  const comments = await getComments();
  res.status(200).json({
    list: comments,
  });
});
