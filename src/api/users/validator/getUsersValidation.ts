import { Joi, Segments, celebrate } from "celebrate";

export const getUsersValidation = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().optional(),
    perPage: Joi.number().optional(),
    filters: Joi.object().optional(),
  }),
});
