import { celebrate, Joi, Segments } from "celebrate";

export const createVoteValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    room: Joi.string().uuid().required(),
    user: Joi.string().uuid().required(),
    value: Joi.number().required(),
  }),
});

export const deleteVoteValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export const getVoteValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export const getVotesByRoomValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export const getVotesByUserValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export const paginateVotesValidation = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(1).max(100).required(),
    filters: Joi.object().default({}),
  }),
});

export const updateVoteValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    room: Joi.string().uuid().required(),
    user: Joi.string().uuid().required(),
    value: Joi.number().required(),
  }),
});
