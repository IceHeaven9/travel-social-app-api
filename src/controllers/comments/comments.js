import { getComments } from '../../database/structure/comments.js';

export const getCommentsController = async (req, res) => {
  const comments = await getComments();
  res.status(200).json({
    list: comments,
  });
};
