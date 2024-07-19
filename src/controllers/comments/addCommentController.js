import { addComment } from "../../database/comments.js";
import { assertTravelExists } from "../../database/travels.js";

export const addCommentController = async (req, res) => {
	const travelId = req.params.travelId;
	const userId = req.currentUser.id;
	const message = req.body.message;

	await assertTravelExists(travelId);

	const id = await addComment(travelId, userId, message);

	res.status(201).json({
		id,
	});
};
