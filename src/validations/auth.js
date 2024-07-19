import Joi from "joi";
import { validate } from "./validate.js";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  username: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export function parseRegisterPayload(payload) {
  const result = validate(registerSchema, payload);
  return result.value;
}
export function parseLoginPayload(payload) {
  const result = validate(loginSchema, payload);
  return result.value;
}
