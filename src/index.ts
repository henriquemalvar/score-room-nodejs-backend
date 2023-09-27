import "dotenv/config";
import "reflect-metadata";
import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response, NextFunction, Router } from "express";
import helmet from "helmet";
import morgan from "morgan";

import AppError from "./utils/custom-error/appError";
import {AppDataSource} from "./data-source";

interface IRoute {
  path: string;
  router: Router;
}

const getRoutes = (): IRoute[] => {
  const routes: IRoute[] = [];
  const normalizedPath = path.join(__dirname, "api");
  fs.readdirSync(normalizedPath).forEach((modelsDir) => {
    const modelDirPath = path.join(normalizedPath, modelsDir);
    fs.readdirSync(modelDirPath).forEach((routeFile) => {
      if (routeFile.endsWith(".ts")) {
        const routeFilePath = path.join(modelDirPath, routeFile);
        const route = require(routeFilePath).default;
        const routeName = routeFile.replace(".ts", "");
        routes.push({ path: `/${modelsDir}/${routeName}`, router: route });
      }
    });
  });
  return routes;
};

const foundRoutes = getRoutes();
const routes = Router();
foundRoutes.forEach((route) => {
  routes.use(route.path, route.router);
});

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
