import { Router } from "express";

import {
    forgotPasswordValidation,
    loginValidation,
    registerValidation,
} from "./validator/authValidators";

import { forgotPassword, login, register } from "./controllers/authControllers";

const authRouter = Router();

authRouter.post("/login", loginValidation, login);

authRouter.post("/register", registerValidation, register);

authRouter.post("/forgot-password", forgotPasswordValidation, forgotPassword);

export default authRouter;
