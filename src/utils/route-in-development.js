export function notImplementedController() {
  throw {
    status: 501,
    name: 'Not Implemented',
    message: 'Route not implemented',
  };
}
