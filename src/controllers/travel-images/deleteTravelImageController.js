import path from "node:path";
import { PUBLIC_DIR } from "../../constants.js";
import {
	assertTravelExists,
	assertUserIsTravelOwner,
} from "../../database/travels.js";
import fs from "node:fs/promises";
import {
	deleteTravelImage,
	getTravelImageById,
} from "../../database/travel-images.js";
import { generateError } from "../../utils/generateErrors.js";

export const deleteTavelImageController = async (req, res) => {
	await assertTravelExists(req.params.travelId);
	await assertUserIsTravelOwner(req.currentUser.id, req.params.travelId);

	const travelImage = await getTravelImageById(req.params.photoId);
	if (!travelImage) {
		throw generateError(
			404,
			"TRAVEL_IMAGE_NOT_FOUND",
			"Travel image not found"
		);
	}

	const filePath = path.join(
		PUBLIC_DIR,
		`/post-images/${path.basename(travelImage.url)}`
	);
	await fs.unlink(filePath);

	await deleteTravelImage(req.params.photoId);

	res.status(200).send();
};
