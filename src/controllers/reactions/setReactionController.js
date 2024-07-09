import { setReaction } from '../../database/structure/reactions.js';
export const setReactionController = async (req, res) => {
  //TODO: validar
  const reaction = req.body.reaction; //number
  const currentUser = req.currentUser; //usuario actual

  await setReaction(req.params.travelId, currentUser.id, reaction);

  res.status(200).json({
    ok: true,
  });
};
