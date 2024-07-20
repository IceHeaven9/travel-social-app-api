import { generateError } from "../utils/generateErrors.js";

export function authGuard(req, res, next) {
	if (!req.currentUser) {
		throw generateError(
			401,
			"UNAUTHORIZED",
			"You must be logged in to access this resource"
		);
	}

	next();
}
