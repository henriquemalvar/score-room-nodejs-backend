import { Router } from "express";

import {
  createVote,
  deleteVote,
  getVote,
  getVotesByRoom,
  getVotesByUser,
  paginateVotes,
  updateVote,
} from "./controllers/votesControllers";

import {
  createVoteValidation,
  deleteVoteValidation,
  getVoteValidation,
  getVotesByRoomValidation,
  getVotesByUserValidation,
  paginateVotesValidation,
  updateVoteValidation,
} from "./validator/votesValidators";

const votesRouter = Router();

votesRouter.get("/paginate", paginateVotesValidation, paginateVotes);
votesRouter.get("/:id", getVoteValidation, getVote);
votesRouter.post("/", createVoteValidation, createVote);
votesRouter.put("/:id", updateVoteValidation, updateVote);
votesRouter.delete("/:id", deleteVoteValidation, deleteVote);
votesRouter.get("/room/:id", getVotesByRoomValidation, getVotesByRoom);
votesRouter.get("/user/:id", getVotesByUserValidation, getVotesByUser);

export default votesRouter;
