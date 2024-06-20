import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants/constants.js';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../../database/structure/users.js';
import { generateError } from '../../utils/generateErrors.js';

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw generateError(400, 'INVALID_CREDENTIALS', 'Invalid credentials');
  }

  if (user.validationCode) {
    throw generateError(
      400,
      'EMAIL_NOT_VALIDATED',
      'You need to validate your email before logging in'
    );
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
      expiresIn: '7d',
    }
  );

  res.status(200).json({
    token,
  });
};
