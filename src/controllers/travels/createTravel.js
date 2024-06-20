import { parseTravelPayload } from '../../validations/travels.js';
import { createTravel } from '../../database/structure/travels.js';

export const createTravelController = async (req, res) => {
  const payload = parseTravelPayload(req.body);

  const id = await createTravel({
    title: payload.title,
    description: payload.description,
    rating: payload.rating,
    userId: req.currentUser.id,
  });

  res.status(201).json({
    id,
  });
};
