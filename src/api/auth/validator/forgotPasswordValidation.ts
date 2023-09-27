import { Joi, Segments, celebrate } from "celebrate";

export const forgotPasswordValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
  }),
});
