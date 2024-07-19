import Joi from "joi";
import { validate } from "./validate.js";

export const travelCreatePayloadSchema = Joi.object({
  title: Joi.string().required().min(5).max(256),
  rating: Joi.number().required().min(1).max(5),
  description: Joi.string().optional(),
});

export const travelSearchSchema = Joi.object({
  text: Joi.string().required().min(3).max(256),
});

export function parseTravelPayload(payload) {
  const result = validate(travelCreatePayloadSchema, payload);
  return result.value;
}

export function parseTravelSearchQuery(query) {
  const result = validate(travelSearchSchema, query);
  return result.value;
}
