import {
  findUserByEmail,
  removeValidationCodeFromUser,
} from '../../database/structure/users.js';

export const validateEmailController = async (req, res) => {
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
};
