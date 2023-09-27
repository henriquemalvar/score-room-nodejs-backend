import { celebrate, Joi, Segments } from "celebrate";

export const createRoomValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
    voteOptions: Joi.array().items(
      Joi.object().keys({
        value: Joi.number().required(),
        label: Joi.string().required(),
      })
    ),
  }),
});
