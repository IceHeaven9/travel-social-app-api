import { getReactions } from '../../database/structure/reactions.js';

export const getReactionController = async (req, res) => {
  const reactions = await getReactions(req.params.id);
  res.status(200).json({
    list: reactions,
  });
};
