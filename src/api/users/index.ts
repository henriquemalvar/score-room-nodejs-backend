import { Router } from "express";

import { createUser } from "./createUser";
import { getUserById } from "./getUserById";
import { getUsers } from "./getUsers";
import { updateUser } from "./updateUser";

import { createUserValidation } from "./validator/createUserValidation";
import { getUserByIdValidation } from "./validator/getUserByIdValidation";
import { getUsersValidation } from "./validator/getUsersValidation";
import { updateUserValidation } from "./validator/updateUserValidation";

const usersRouter = Router();

usersRouter.post("/", createUserValidation, createUser);

usersRouter.get("/", getUsersValidation, getUsers);

usersRouter.get("/:id", getUserByIdValidation, getUserById);

usersRouter.put("/:id", updateUserValidation, updateUser);

export default usersRouter;
