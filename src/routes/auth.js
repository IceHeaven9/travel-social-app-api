import { Router } from 'express';
import bcrypt from 'bcrypt';
import { asyncHandler } from '../utils/async-handler.js';
import {
  assertEmailNotInUse,
  assertUsernameNotInUse,
  createUser,
  findUserByEmail,
  removeValidationCodeFromUser,
} from '../database/structure/users.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';
import crypto from 'node:crypto';
import { sendValidationEmail } from '../emails/validation-email.js';
import { hashPassword } from '../utils/hash-password.js';

export const authRoutes = Router();

authRoutes.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, email, password, username } = req.body;

    await assertEmailNotInUse(email);
    await assertUsernameNotInUse(username);

    const hashedPassword = await hashPassword(password);
    const validationCode = crypto.randomBytes(4).toString('hex');

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
  })
);

authRoutes.post(
  '/login',
  asyncHandler(async (req, res) => {
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
  })
);

authRoutes.post(
  '/validate-email',
  asyncHandler(async (req, res) => {
    const { email, code } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      throw {
        status: 400,
        name: 'INVALID_CODE',
        message: 'The code is invalid',
      };
    }

    if (!user.validationCode) {
      throw {
        status: 400,
        name: 'EMAIL_ALREADY_VALIDATED',
        message: 'The email is already validated',
      };
    }

    if (user.validationCode !== code) {
      throw {
        status: 400,
        name: 'INVALID_CODE',
        message: 'The code is invalid',
      };
    }

    await removeValidationCodeFromUser(user.id);

    res.status(200).send();
  })
);
