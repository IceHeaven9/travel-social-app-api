import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";

export function parseCurrentUser(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    try {
      req.currentUser = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        next({
          ...err,
          name: "TOKEN_EXPIRED",
          status: 401,
        });
      }
    }
  }

  next();
}
