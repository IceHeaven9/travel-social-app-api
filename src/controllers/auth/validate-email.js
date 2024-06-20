import {
  findUserByEmail,
  removeValidationCodeFromUser,
} from '../../database/structure/users.js';
import { generateError } from '../../utils/generateErrors.js';

export const validateEmailController = async (req, res) => {
  const { email, code } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw generateError(400, 'INVALID CODE', 'the code is invalid');
  }

  if (!user.validationCode) {
    throw generateError(
      400,
      'EMAIL_ALREDY_VALIDATED',
      'the email is alredy validated'
    );
  }

  if (user.validationCode !== code) {
    throw generateError(400, 'INVALID CODE', 'the code is invalid');
  }

  await removeValidationCodeFromUser(user.id);

  res.status(200).send();
};
