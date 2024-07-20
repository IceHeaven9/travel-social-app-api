import {
	findUserByEmail,
	removeValidationCodeFromUser,
} from "../../database/users.js";
import { generateError } from "../../utils/generateErrors.js";

export const validateEmailController = async (req, res) => {
	const { email, code } = req.body;

	const user = await findUserByEmail(email);

	console.log(user);

	if (!user) {
		throw generateError(400, "INVALID_CODE", "The code is invalid");
	}

	if (!user.validationCode) {
		throw generateError(
			400,
			"EMAIL_ALREDY_VALIDATED",
			"Email is already validated"
		);
	}

	if (user.validationCode !== code) {
		throw generateError(400, "INVALID_CODE", "The code is invalid");
	}

	await removeValidationCodeFromUser(user.id);

	// res.redirect(`${FRONTEND_HOST}/login?validated=true`);

	res.status(200).send();
};
