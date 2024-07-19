import {
	assertUserIsCommentOwner,
	deleteComment,
} from "../../database/comments.js";
import { assertTravelExists } from "../../database/travels.js";

export const deleteCommentController = async (req, res) => {
	const travelId = req.params.travelId;
	const commentId = req.params.commentId;
	const userId = req.currentUser.id;

	await assertTravelExists(travelId);
	await assertUserIsCommentOwner(commentId, userId);

	await deleteComment(commentId);

	res.status(200).send();
};
