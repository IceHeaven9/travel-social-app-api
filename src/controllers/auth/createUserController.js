import {
	assertEmailNotInUse,
	assertUsernameNotInUse,
	createUser,
} from "../../database/users.js";
import crypto from "node:crypto";
import { sendValidationEmail } from "../../emails/validation-email.js";
import { hashPassword } from "../../utils/hash-password.js";
import { parseRegisterPayload } from "../../validations/auth.js";

export const createUserController = async (req, res) => {
	const { name, email, password, username } = parseRegisterPayload(req.body);

	await assertEmailNotInUse(email);
	await assertUsernameNotInUse(username);

	const hashedPassword = await hashPassword(password);
	const validationCode = crypto.randomBytes(4).toString("hex");

	const id = await createUser({
		name,
		email,
		hashedPassword,
		username,
		validationCode,
	});

	sendValidationEmail({ name, email, validationCode });

	res.status(201).json({
		id,
	});
};
