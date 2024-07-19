import {
	assertTravelExists,
	assertUserIsTravelOwner,
	deleteTravel,
} from "../../database/travels.js";

export const deleteTravelController = async (req, res) => {
	const travelId = req.params.travelId;
	const userId = req.currentUser.id;

	await assertTravelExists(travelId);
	await assertUserIsTravelOwner(userId, travelId);

	await deleteTravel(travelId);

	await res.status(200).send();
};
