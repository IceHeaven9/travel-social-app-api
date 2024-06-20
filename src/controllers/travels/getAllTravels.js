import { getAllTravels } from '../../database/structure/travels.js';

export const getAllTravelsController = async (req, res) => {
  const { offset = 0 } = req.query;
  const travels = await getAllTravels(offset);

  res.status(200).json({
    list: travels,
  });
};
