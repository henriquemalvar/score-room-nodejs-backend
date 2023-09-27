import "dotenv/config";
import { DataSource } from "typeorm";
import * as fs from "fs";
import * as path from "path";

class DynamicDataSource {
  dir: string;
  files: string[];
  entities: any[];
  migrations: any[];
  constructor() {
    this.dir = "";
    this.files = [];
    this.entities = [];
    this.migrations = [];
  }

  public async init(): Promise<any[]> {
    this.dir = path.join(__dirname, "./models");
    this.files = fs
      .readdirSync(this.dir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    await Promise.all(
      this.files.map(async (file) => {
        const entity = await import(path.join(this.dir, file));
        this.entities.push(entity.default || entity);
      })
    );

    this.dir = path.join(__dirname, "./migrations");
    this.files = fs
      .readdirSync(this.dir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    await Promise.all(
      this.files.map(async (file) => {
        const migration = await import(path.join(this.dir, file));
        this.migrations.push(migration.default || migration);
      })
    );

    return this.entities;
  }
}

const dynamicDataSource = new DynamicDataSource();
dynamicDataSource.init();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: dynamicDataSource.entities,
  subscribers: [],
  migrations: dynamicDataSource.migrations,
});
