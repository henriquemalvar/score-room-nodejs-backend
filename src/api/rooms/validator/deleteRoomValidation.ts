import { celebrate, Joi, Segments } from "celebrate";

export const deleteRoomValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});
