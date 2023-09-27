import { celebrate, Joi, Segments } from "celebrate";

export const paginateRoomsValidation = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(1).max(100).required(),
    filters: Joi.object().default({}),
  }),
});
