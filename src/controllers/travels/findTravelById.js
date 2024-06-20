import { findTravelById } from '../../database/structure/travels.js';

export const findTravelByIdController = async (req, res) => {
  const travel = await findTravelById(req.params.travelId);

  res.status(200).json(travel);
};
