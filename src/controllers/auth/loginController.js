import bcrypt from "bcrypt";
import { findUserByEmail } from "../../database/users.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants.js";
import { parseLoginPayload } from "../../validations/auth.js";
import { generateError } from "../../utils/generateErrors.js";

export const loginController = async (req, res) => {
	const { email, password } = parseLoginPayload(req.body);

	const user = await findUserByEmail(email);

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw generateError(
			401,
			"INVALID_CREDENTIALS",
			"Invalid email or password"
		);
	}

	if (user.validationCode) {
		throw generateError(401, "UNVERIFIED_EMAIL", "Email is not verified");
	}

	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			role: user.role,
		},
		JWT_SECRET,
		{
			expiresIn: "1d",
		}
	);

	res.status(200).json({
		token,
	});
};
