import { celebrate, Joi, Segments } from "celebrate";

export const updateRoomValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string(),
    password: Joi.string(),
    voteOptions: Joi.array().items(
      Joi.object().keys({
        value: Joi.number().required(),
        label: Joi.string().required(),
      })
    ),
  }),
});
