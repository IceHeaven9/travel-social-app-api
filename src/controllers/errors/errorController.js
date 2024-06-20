export const errorController = (err, req, res, next) => {
  console.error(err);

  res.status(err.status ?? 500).json({
    error: err.name,
    message: err.message,
  });
};
