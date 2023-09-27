import { celebrate, Joi, Segments } from "celebrate";

export const getRoomValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});
