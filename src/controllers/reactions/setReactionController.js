import Joi from 'joi';
import { setReaction } from '../../database/structure/reactions.js';
export const setReactionController = async (req, res) => {
  //TODO: validar

  // Implementar la validación de los parámetros de entrada
  const schema = Joioi.object({
    reaction: Joi.number().valid(1, 0).required(),
  });

  // Validar los parámetros de entrada
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      ok: false,
      error: error.details[0].message,
    });
  }

  const reaction = req.body.reaction; //number
  const currentUser = req.currentUser; //usuario actual

  await setReaction(req.params.travelId, currentUser.id, reaction);

  res.status(200).json({
    ok: true,
  });
};
