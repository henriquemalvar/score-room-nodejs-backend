import "dotenv/config";
import { DataSource } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import { CreateVoteTable1695316369773 } from "./migrations/1695316369773-createVoteTable";
import { CreateUserTable1695316370216 } from "./migrations/1695316370216-createUserTable";
import { CreateRoomTable1695316370719 } from "./migrations/1695316370719-createRoomTable";
import { CreateConfigTable1695316371173 } from "./migrations/1695316371173-createConfigTable";

class DynamicEntity {
  dir: string;
  files: string[];
  entities: any[];
  constructor() {
    this.dir = "";
    this.files = [];
    this.entities = [];
  }

  public init(): any[] {
    this.dir = path.join(__dirname, "./models");
    this.files = fs
      .readdirSync(this.dir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    this.entities = this.files.map((file) => {
      const entity = require(path.join(this.dir, file));
      return entity.default || entity;
    });
    return this.entities;
  }
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: new DynamicEntity().init(),
  subscribers: [],
  migrations: [
    CreateUserTable1695316370216,
    CreateConfigTable1695316371173,
    CreateRoomTable1695316370719,
    CreateVoteTable1695316369773,
  ],
});
