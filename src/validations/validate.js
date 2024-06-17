export function validate(schema, payload) {
  const result = schema.validate(payload, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });
  if (result.error)
    throw {
      status: 400,
      name: 'VALIDATION_ERROR',
      message: result.error.message,
      details: result.error.details,
    };
  return result;
}
