import { Joi, Segments, celebrate } from "celebrate";

export const getUserByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});
