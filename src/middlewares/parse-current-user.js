import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';

export function parseCurrentUser(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    req.currentUser = jwt.verify(token, JWT_SECRET);
  }

  next();
}
