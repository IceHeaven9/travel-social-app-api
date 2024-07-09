import { getAllTravels } from '../../database/structure/travels.js';

export const getAllTravelsController = async (req, res) => {
  const { offset = 0 } = req.query;

  const currentUserId = req.currentUser?.id;

  const travels = await getAllTravels(offset, currentUserId);

  res.status(200).json({
    list: travels,
  });
};
