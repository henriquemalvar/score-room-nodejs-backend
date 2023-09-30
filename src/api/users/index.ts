import { Router } from "express";

import {
  createUser,
  getUserById,
  getUsers,
  paginateUsers,
  updateUser,
} from "./controllers/usersControllers";

import {
  createUserValidation,
  getUserByIdValidation,
  paginateUsersValidation,
  updateUserValidation,
} from "./validator/usersValidators";

const usersRouter = Router();

usersRouter.post("/", createUserValidation, createUser);

usersRouter.get("/", getUsers);

usersRouter.get("/paginate", paginateUsersValidation, paginateUsers);

usersRouter.get("/:id", getUserByIdValidation, getUserById);

usersRouter.put("/:id", updateUserValidation, updateUser);

export default usersRouter;
