import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants/constants.js';
import bcrypt from 'bcrypt';
import { findUserByEmail } from '../../database/structure/users.js';

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw {
      status: 400,
      name: 'INVALID_CREDENTIALS',
      message: 'Your email or password is incorrect',
    };
  }

  if (user.validationCode) {
    throw {
      status: 400,
      name: 'EMAIL_NOT_VALIDATED',
      message: 'You need to validate your email before logging in',
    };
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
