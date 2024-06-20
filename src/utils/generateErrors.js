export const generateError = (httpStatus, error, message) => {
  return {
    status: httpStatus,
    name: error,
    message,
  };
};
