import { Router } from "express";
import usersRouter from "./api/users";
import authRouter from "./api/auth";
import roomsRouter from "./api/rooms";
import votesRouter from "./api/votes";

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/auth", authRouter);
routes.use("/rooms", roomsRouter);
routes.use("/votes", votesRouter);

export default routes;