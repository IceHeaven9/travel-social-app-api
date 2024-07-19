import { findTravelById } from "../../database/travels.js";

export const findTravelByIdController = async (req, res) => {
	const currentUserId = req.currentUser?.id;

	const travel = await findTravelById(req.params.travelId, currentUserId);

	res.status(200).json(travel);
};
