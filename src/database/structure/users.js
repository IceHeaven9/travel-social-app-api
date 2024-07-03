import { generateError } from '../../utils/generateErrors.js';
import { db } from './db.js';

export async function findUserByEmail(email) {
  const [[user]] = await db.query(`SELECT * FROM users WHERE email = :email`, {
    email,
  });

  return user;
}

export async function getUserInfo(userId) {
  const [[user]] = await db.query(
    `SELECT id, username, name, avatar FROM users WHERE id = :userId`,
    {
      userId,
    }
  );

  return user;
}

export async function createUser({
  name,
  email,
  username,
  hashedPassword,
  role = 'USER',
  validationCode = null,
  avatar = null,
}) {
  const [{ insertId }] = await db.query(
    `INSERT INTO users(name, email, password, username, validationCode, role, avatar)
    VALUES (:name, :email, :hashedPassword, :username, :validationCode, :role, :avatar)`,
    { name, email, username, hashedPassword, validationCode, role, avatar }
  );

  return insertId;
}

export async function assertUserExists(userId) {
  const user = await getUserInfo(userId);
  if (!user) {
    throw generateError(404, 'ERROR', 'The user does not exist');
  }
}

export async function getUserProfile(userId) {
  const [[user]] = await db.query(
    `SELECT name, username, avatar FROM users WHERE id = :userId`,
    {
      userId,
    }
  );

  return user;
}

export async function updateUserProfile({ name, username, avatar, userId }) {
  await db.query(
    `UPDATE users SET name = :name, username = :username, avatar = :avatar WHERE id = :userId`,
    {
      name,
      username,
      avatar,
      userId,
    }
  );
}

export async function removeValidationCodeFromUser(userId) {
  await db.query(`UPDATE users SET validationCode = NULL WHERE id = :userId`, {
    userId,
  });
}

export async function assertEmailNotInUse(email) {
  const user = await findUserByEmail(email);

  if (user) {
    throw generateError(400, 'ERROR', 'The email is already in use');
  }
}

export async function assertUsernameNotInUse(username) {
  const [[result]] = await db.query(
    `SELECT username FROM users WHERE username = :username`,
    {
      username,
    }
  );

  if (result) {
    throw generateError(400, 'ERROR', 'The username is already in use');
  }
}
