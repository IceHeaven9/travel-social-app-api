import { getCompanionsByTravelId } from '../../database/structure/companions.js';
import { assertTravelExists } from '../../database/structure/travels.js';

export const getCompanionByTravelIdController = async (req, res) => {
  await assertTravelExists(req.params.travelId);

  const companions = await getCompanionsByTravelId(req.params.travelId);

  res.status(200).json({
    list: companions,
  });
};
