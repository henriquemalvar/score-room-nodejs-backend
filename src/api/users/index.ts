import { Router } from "express";

import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
} from "./controllers/usersControllers";

import {
  createUserValidation,
  getUserByIdValidation,
  getUsersValidation,
  updateUserValidation,
} from "./validator/usersValidators";

const usersRouter = Router();

usersRouter.post("/", createUserValidation, createUser);

usersRouter.get("/", getUsersValidation, getUsers);

usersRouter.get("/:id", getUserByIdValidation, getUserById);

usersRouter.put("/:id", updateUserValidation, updateUser);

export default usersRouter;
