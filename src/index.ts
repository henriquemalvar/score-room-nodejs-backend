import "dotenv/config";
import "reflect-metadata";

import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import { AppDataSource } from "./data-source";

import AppError from "./utils/custom-error/appError";
import routes from "./routes";

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(morgan("dev"));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
  });
});

app.use("/", routes);

app
  .listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
    AppDataSource.initialize()
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.log("Error connecting to database", err);
      });
  })
  .on("error", (err) => {
    console.log("Error starting server", err);
  });
