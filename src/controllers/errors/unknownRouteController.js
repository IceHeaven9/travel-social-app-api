export const unknownRouteController = (req, res) => {
  res.status(404).json({
    error: 'UNKNOWN_ROUTE',
    message: 'Wrong route',
  });
};
