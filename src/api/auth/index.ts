import { Router } from "express";

import { forgotPassword } from "./forgotPassword";
import { login } from "./login";
import { register } from "./register";

import { forgotPasswordValidation } from "./validator/forgotPasswordValidation";
import { loginValidation } from "./validator/loginValidation";
import { registerValidation } from "./validator/registerValidation";

const authRouter = Router();

authRouter.post("/login", loginValidation, login);

authRouter.post("/register", registerValidation, register);

authRouter.post("/forgot-password", forgotPasswordValidation, forgotPassword);

export default authRouter;
