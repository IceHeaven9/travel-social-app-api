import { getTravelImageByTravelId } from '../../database/structure/travel-images.js';

export const getTravelImageByTravelIdController = async (req, res) => {
  const images = await getTravelImageByTravelId(req.params.travelId);

  res.status(200).json(images);
};
