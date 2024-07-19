import { assertTravelExists } from "../../database/travels.js";
import { getCompanionsByTravelId } from "../../database/companions.js";

export const getCompanionsByTravelIdController = async (req, res) => {
	await assertTravelExists(req.params.travelId);

	const companions = await getCompanionsByTravelId(req.params.travelId);

	res.status(200).json({
		list: companions,
	});
};
