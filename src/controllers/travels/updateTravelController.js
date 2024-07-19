import { parseTravelPayload } from "../../validations/travels.js";
import {
	assertTravelExists,
	assertUserIsTravelOwner,
	updateTravel,
} from "../../database/travels.js";

export const updateTravelController = async (req, res) => {
	const payload = parseTravelPayload(req.body);

	await assertTravelExists(req.params.travelId);
	await assertUserIsTravelOwner(req.currentUser.id, req.params.travelId);

	await updateTravel({
		title: payload.title,
		description: payload.description,
		rating: payload.rating,
		travelId: req.params.travelId,
	});

	await res.status(200).send();
};
