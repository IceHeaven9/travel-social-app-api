import { getTravelComments } from "../../database/comments.js";
import { assertTravelExists } from "../../database/travels.js";

export const getTravelCommentsController = async (req, res) => {
	const travelId = req.params.travelId;
	await assertTravelExists(travelId);

	const comments = await getTravelComments(travelId);

	res.status(200).json({
		list: comments,
	});
};
