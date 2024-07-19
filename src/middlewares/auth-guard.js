export function authGuard(req, res, next) {
  if (!req.currentUser) {
    throw {
      status: 401,
      name: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    };
  }

  next();
}
