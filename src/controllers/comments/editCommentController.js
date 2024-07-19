import {
	assertUserIsCommentOwner,
	editComment,
} from "../../database/comments.js";
import { assertTravelExists } from "../../database/travels.js";

export const editCommentController = async (req, res) => {
	const travelId = req.params.travelId;
	const commentId = req.params.commentId;
	const userId = req.currentUser.id;
	const message = req.body.message;

	await assertTravelExists(travelId);
	await assertUserIsCommentOwner(commentId, userId);

	await editComment(commentId, message);

	res.status(200).send();
};
