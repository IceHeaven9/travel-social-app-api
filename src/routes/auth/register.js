import crypto from 'node:crypto';
import { sendValidationEmail } from '../../emails/validation-email.js';
import { hashPassword } from '../../utils/hash-password.js';
import {
  assertEmailNotInUse,
  assertUsernameNotInUse,
  createUser,
} from '../../database/structure/users.js';
import { Router } from 'express';
import { asyncHandler } from '../../utils/async-handler.js';

export const registerAtuhRoute = Router();

registerAtuhRoute.post(
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
