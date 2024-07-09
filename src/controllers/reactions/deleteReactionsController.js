import { removeReaction } from '../../database/structure/reactions.js';
export const deleteReactionController = async (req, res) => {
  //TODO: validar
  const currentUser = req.currentUser; //usuario actual

  await removeReaction(req.params.travelId, currentUser.id);

  res.status(200).json({
    ok: true,
  });
};
