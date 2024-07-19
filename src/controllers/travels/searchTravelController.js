import { parseTravelSearchQuery } from "../../validations/travels.js";
import { searchTravels } from "../../database/travels.js";

export const searchTravelController = async (req, res) => {
	const { text } = parseTravelSearchQuery(req.query);
	const currentUserId = req.currentUser?.id;

	const travels = await searchTravels(text, currentUserId);

	res.status(200).json({
		list: travels,
	});
};
