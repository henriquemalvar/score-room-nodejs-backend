import { celebrate, Joi, Segments } from "celebrate";

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
