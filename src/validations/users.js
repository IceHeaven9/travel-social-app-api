import Joi from "joi";
import { validate } from "./validate.js";

const profileSchema = Joi.object({
  name: Joi.string().min(3).max(255).optional(),
  username: Joi.string().min(3).max(255).optional(),
  avatarFile: Joi.object({
    mimetype: Joi.string()
      .regex(/^image\/.*$/)
      .required(),
    data: Joi.string().base64().required(),
  }).optional(),
});

export function parseUserProfilePayload(payload) {
  const result = validate(profileSchema, payload);
  return result.value;
}
