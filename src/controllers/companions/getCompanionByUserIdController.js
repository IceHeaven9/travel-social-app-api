import { getTravelsCompanionsByUserId } from "../../database/companions.js";
import { assertUserExists } from "../../database/users.js";

export const getCompanionsByUserIdController = async (req, res) => {
	await assertUserExists(req.params.userId);

	const companions = await getTravelsCompanionsByUserId(req.params.userId);

	res.status(200).json({
		list: companions,
	});
};
