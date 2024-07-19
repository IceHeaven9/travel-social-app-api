import { getAllTravels } from "../../database/travels.js";
export const getAllTravelsController = async (req, res) => {
	const { offset = 0 } = req.query;
	const currentUserId = req.currentUser?.id;

	const [travels, hasNextPage] = await getAllTravels(
		currentUserId,
		Number(offset)
	);

	res.status(200).json({
		list: travels,
		hasNextPage,
	});
};
