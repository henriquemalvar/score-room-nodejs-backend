import { Joi, Segments, celebrate } from "celebrate";

export const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const getUserByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export const getUsersValidation = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().optional(),
    perPage: Joi.number().optional(),
    filters: Joi.object().optional(),
  }),
});

export const updateUserValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().optional(),
  }),
});