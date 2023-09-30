import { celebrate, Joi, Segments } from "celebrate";

export const createRoomValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    owner: Joi.string().uuid().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    voteOptions: Joi.array().items(
      Joi.object().keys({
        value: Joi.number().required(),
        label: Joi.string().required(),
      })
    ).default([]),
  }),
});

export const getRoomValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export const paginateRoomsValidation = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1).required(),
    limit: Joi.number().min(1).max(100).required(),
    filters: Joi.object().default({}),
  }),
});

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

export const editRoomConfigValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    visibility: Joi.string().valid("public", "private"),
    voteType: Joi.string().valid("single", "multiple"),
    voteVisibility: Joi.string().valid("public", "private"),
    voteTime: Joi.number(),
    voteTimeType: Joi.string().valid("seconds", "minutes", "hours", "days"),
    voteAutoClose: Joi.boolean(),
    calculateVotes: Joi.boolean(),
    calculateType: Joi.string().valid("average", "mode", "median"),
    calculateRound: Joi.string().valid("up", "down", "nearest"),
    calculatePrecision: Joi.number(),
  }),
});

export const deleteRoomValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});
