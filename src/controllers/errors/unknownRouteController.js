export const unknownRoute = (req, res) => {
	res.status(404).json({
		error: "404 UNKNOWN_ROUTE",
		message: "Wrong route",
	});
};
