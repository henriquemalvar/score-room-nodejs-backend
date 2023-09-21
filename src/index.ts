import "dotenv/config";
import "reflect-metadata";
import fs from "fs";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(morgan("dev"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
