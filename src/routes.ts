import { Router } from "express";
import usersRouter from "./api/users";
import authRouter from "./api/auth";
import roomsRouter from "./api/rooms";
import votesRouter from "./api/votes";

export const routes = Router();
routes.get("/users", usersRouter);
routes.get("/auth", authRouter);
routes.get("/rooms", roomsRouter);
routes.get("/votes", votesRouter);
