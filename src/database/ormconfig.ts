import path from "path";
import { ConnectionOptions } from "typeorm";
import { ContactMessageIdentity } from "../entities/ContactMessageIdentity";
import { FileIdentity } from "../entities/FileIdentity";
import 'dotenv/config'

const connectionConfig: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
  entities: [
    ContactMessageIdentity,
    FileIdentity,
  ],
  dropSchema: false,
  synchronize: false,
  logging: false,
  migrations: [path.resolve(__dirname, 'migrations', '*{.ts,.js}')],
  cli: {
    migrationsDir: path.resolve(__dirname, 'migrations'),
  }
};

export default connectionConfig;