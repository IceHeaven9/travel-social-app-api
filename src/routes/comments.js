import { Router } from 'express';
import { getCommentsController } from '../controllers/comments/comments.js';

export const commentRoutes = Router();

commentRoutes.get('/travel/:id/comments', getCommentsController);
